import { CreateOrderReq } from '@/dto/order/create-order.req';
import { CreatePaymentReq } from '@/dto/payment/create-payment.req';
import { PaymentCreatedEventDto } from '@/dto/payment/payment-created-event.dto';
import { ProductDto } from '@/dto/product.dto';
import { OrderStatusEnum } from '@/enums/order-status.enum';
import { PaymentMethodEnum } from '@/enums/payment-method.enum';
import { Order } from '@/models/order.model';
import { OrderItem } from '@/models/order_item.model';
import { ICartRepository } from '@/repository/interface/i.cart.repository';
import { IOrderRepository } from '@/repository/interface/i.order.repository';
import { IPaymentRepository } from '@/repository/interface/i.payment.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IOrderService } from '@/service/interface/i.order.service';
import { inject, injectable } from 'inversify';

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
  async createOrder(shopperId: string, data: CreateOrderReq): Promise<Order> {
    const cart = await this.cartRepository.findByShopperId(shopperId);

    const order = new Order();
    order.shopperId = shopperId;
    order.address = data.address;
    order.total = cart.total;

    const orderItems = new Array<OrderItem>();

    const productInCarts = cart.products;

    for (const productInCart of productInCarts) {
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

    order.items = orderItems;

    const createdOrder = await this.orderRepository.save(order);

    //Call to payment service to create payment
    const createPaymentReq = new CreatePaymentReq();
    createPaymentReq.total = order.total;
    createPaymentReq.order = order;
    createPaymentReq.orderId = order.id;
    createPaymentReq.paymentMethod = data.paymentMethod;

    this.paymentRepository.createPayment(createPaymentReq);

    return createdOrder;
  }
}
