import { PaymentCreatedEventDto } from '@/dto/payment/payment-created-event.dto';

export interface IOrderRepository {
  sendPaidEvent(data: PaymentCreatedEventDto): Promise<void>;
}
