import { Expose } from 'class-transformer';

export class PaymentCreatedEventDto {
  @Expose()
  id!: string;
  @Expose()
  orderId!: string;
  @Expose()
  paymentMethod!: string;
  @Expose()
  total!: number;
  @Expose()
  paymentInfo?: any;
  @Expose()
  status!: string;
}
