import { JwtClaimDto } from '@/dto/jwt-claim.dto';
import { CreateOrderReq } from '@/dto/order/create-order.req';
import { FindOrderWithFilterReq } from '@/dto/order/find-order-with-filter.req';
import { FindOrderWithFilterSelect } from '@/dto/order/find-order-with-filter.select';
import { PagingResponseDto } from '@/dto/paging-response.dto';
import { PagingDto } from '@/dto/paging.dto';
import { CreatePaymentReq } from '@/dto/payment/create-payment.req';
import { PaymentCreatedEventDto } from '@/dto/payment/payment-created-event.dto';
import { ProductDto } from '@/dto/product.dto';
import { ErrorCode } from '@/enums/error-code.enums';
import { OrderStatusEnum } from '@/enums/order-status.enum';
import { PaymentMethodEnum } from '@/enums/payment-method.enum';
import { RoleNameEnum } from '@/enums/role-name.enum';
import { Order } from '@/models/order.model';
import { OrderItem } from '@/models/order_item.model';
import { ICartRepository } from '@/repository/interface/i.cart.repository';
import { IOrderRepository } from '@/repository/interface/i.order.repository';
import { IPaymentRepository } from '@/repository/interface/i.payment.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IOrderService } from '@/service/interface/i.order.service';
import { RecordOrderType } from '@/types/record-order.types';
import BaseError from '@/utils/error/base.error';
import { getEnumValue } from '@/utils/get-enum-value.util';
import { inject, injectable } from 'inversify';
import { LessThanOrEqual, Like, MoreThanOrEqual } from 'typeorm';

@injectable()
export class OrderService extends BaseCrudService<Order> implements IOrderService<Order> {
  private orderRepository: IOrderRepository<Order>;
  private cartRepository: ICartRepository;
  private paymentRepository: IPaymentRepository;

  constructor(
    @inject('OrderRepository') orderRepository: IOrderRepository<Order>,
    @inject('CartRepository') cartRepository: ICartRepository,
    @inject('PaymentRepository') paymentRepository: IPaymentRepository
  ) {
    super(orderRepository);
    this.orderRepository = orderRepository;
    this.cartRepository = cartRepository;
    this.paymentRepository = paymentRepository;
  }

  async checkForApproveOrder(user: JwtClaimDto, orderId: string): Promise<void> {
    if (user.roleName !== RoleNameEnum.salesman) {
      throw new BaseError(ErrorCode.AUTH_01, 'You are not allowed to approve order');
    }
    const order = await this.orderRepository.findOne({
      filter: {
        id: orderId
      }
    });
    if (order?.shopId !== user.shopId) {
      throw new BaseError(ErrorCode.AUTH_01, 'You are not allowed to approve order');
    }
  }

  /**
   * * Find order with filter
   * @param filter
   * @param paging
   */
  async findWithFilter(filter: FindOrderWithFilterReq, paging: PagingDto): Promise<PagingResponseDto<Order>> {
    let where = {};
    const sort: RecordOrderType[] = [];

    if (filter.sort) {
      sort.push({
        column: filter.sort.by,
        direction: filter.sort.order
      });
    }

    if (filter.shopId) {
      where = {
        ...where,
        shopId: filter.shopId
      };
    }

    if (filter.id) {
      where = {
        ...where,
        id: filter.id
      };
    }

    if (filter.status) {
      where = {
        ...where,
        status: getEnumValue(OrderStatusEnum, filter.status)
      };
    }

    if (filter.address) {
      where = {
        ...where,
        address: Like(`%${filter.address}%`)
      };
    }

    if (filter.shopperId) {
      where = {
        ...where,
        shopperId: filter.shopperId
      };
    }

    if (filter.totalFrom) {
      where = {
        ...where,
        total: MoreThanOrEqual(filter.totalFrom)
      };
    }

    if (filter.totalTo) {
      where = {
        ...where,
        total: LessThanOrEqual(filter.totalTo)
      };
    }

    //console.log('paging', paging);

    const orders = await this.orderRepository.findMany({
      filter: where,
      paging: paging,
      order: sort,
      relations: ['items'],
      select: FindOrderWithFilterSelect
    });

    const totalRecords = await this.baseRepository.count({
      filter: where
    });
    return {
      items: orders,
      total: totalRecords
    };
  }

  /**
   * * Handle paid event from payment service
   * This will handle the paid event from payment service
   * by update the order status to paid
   * @param orderId
   */
  async handlePaidEvent(data: PaymentCreatedEventDto): Promise<void> {
    const order = await this.orderRepository.findOne({
      filter: {
        id: data.orderId
      }
    });

    if (!order) {
      console.log('Order not found');
      return;
    }

    order.status = OrderStatusEnum.PENDING;
    order.paymentId = data.id;

    await this.orderRepository.save(order);

    return;
  }

  /**
   * * Create an order for a shopper
   * This will create an order for a shopper by load the shopper's cart and create an order from it
   * @param shopperId
   */
  async createOrder(shopperId: string, data: CreateOrderReq): Promise<Order[]> {
    const cart = await this.cartRepository.findByShopperId(shopperId);

    //Nếu sản phẩm trong giỏ hàng thuộc nhiều shop khác nhau => tách thành các order khác nhau

    const shopIds = new Set<string>();

    for (const productInCart of cart.products) {
      shopIds.add(productInCart.shopId);
    }

    console.log('shopIds', shopIds);

    const createdOrders = new Array<Order>();

    for (const shopId of shopIds) {
      const order = new Order();
      order.shopperId = shopperId;
      order.address = data.address;
      order.shopId = shopId;

      const orderItems = new Array<OrderItem>();

      const productInCarts = cart.products;

      let total = 0;

      for (const productInCart of productInCarts) {
        if (productInCart.shopId !== shopId) {
          continue;
        }

        total += productInCart.price * productInCart.amount;

        const orderItem = new OrderItem();
        orderItem.productId = productInCart.id;
        orderItem.amount = productInCart.amount;

        // Copy product data to order item
        const productDto = new ProductDto();

        productDto.id = productInCart.id;
        productDto.name = productInCart.name;
        productDto.price = productInCart.price;
        productDto.picture = productInCart.picture;
        productDto.description = productInCart.description;

        orderItem.product = productDto;

        orderItems.push(orderItem);
      }

      order.total = total;
      order.items = orderItems;

      const createdOrder = await this.orderRepository.save(order);

      //Call to payment service to create payment
      const createPaymentReq = new CreatePaymentReq();
      createPaymentReq.total = order.total;
      createPaymentReq.order = order;
      createPaymentReq.orderId = order.id;
      createPaymentReq.paymentMethod = data.paymentMethod;

      this.paymentRepository.createPayment(createPaymentReq);

      createdOrders.push(createdOrder);
    }

    return createdOrders;
  }
}
