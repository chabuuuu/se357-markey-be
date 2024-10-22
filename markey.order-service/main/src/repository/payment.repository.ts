import { CreatePaymentReq } from '@/dto/payment/create-payment.req';
import { IPaymentRepository } from '@/repository/interface/i.payment.repository';
import { GlobalConfig } from '@/utils/config/global-config.util';
import axios from 'axios';
import { injectable } from 'inversify';

@injectable()
export class PaymentRepository implements IPaymentRepository {
  private paymentServiceUrl = GlobalConfig.microservices.payment.url;

  /**
   * * Call to payment service to create payment
   * @param data
   */
  async createPayment(data: CreatePaymentReq): Promise<void> {
    const endpoint = GlobalConfig.microservices.payment.api.create_payment.endpoint;

    // Call with axios to shopping service to get cart by shopper id
    const response = await axios.post(`${this.paymentServiceUrl}${endpoint}`, data);

    console.log('Payment created:', response.data);

    return;
  }
}
