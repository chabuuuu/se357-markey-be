import { CreatePaymentReq } from '@/dto/payment/create-payment.req';

export interface IPaymentRepository {
  createPayment(data: CreatePaymentReq): Promise<void>;
}
