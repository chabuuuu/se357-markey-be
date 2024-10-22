import { CreateOrderReq } from '@/dto/order/create-order.req';
import { PaymentCreatedEventDto } from '@/dto/payment/payment-created-event.dto';
import { Order } from '@/models/order.model';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface IOrderService<T extends BaseModelType> extends IBaseCrudService<T> {
  /**
   * * Handle paid event from payment service
   * This will handle the paid event from payment service
   * by update the order status to paid
   * @param orderId
   */
  handlePaidEvent(data: PaymentCreatedEventDto): Promise<void>;

  /**
   * * Create an order for a shopper
   * This will create an order for a shopper by load the shopper's cart and create an order from it
   * @param shopperId
   */
  createOrder(shopperId: string, data: CreateOrderReq): Promise<Order>;
}
