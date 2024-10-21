import { GetVnpUrl } from '@/dto/payment/get-vnp-url.res';
import { ErrorCode } from '@/enums/error-code.enums';
import { Payment } from '@/models/payment.model';
import { IPaymentRepository } from '@/repository/interface/i.payment.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IPaymentService } from '@/service/interface/i.payment.service';
import BaseError from '@/utils/error/base.error';
import { createVNPayUrl } from '@/utils/vnpay/create-pay-url.util';
import { inject, injectable } from 'inversify';

@injectable()
export class PaymentService extends BaseCrudService<Payment> implements IPaymentService<Payment> {
  private paymentRepository: IPaymentRepository<Payment>;

  constructor(@inject('PaymentRepository') paymentRepository: IPaymentRepository<Payment>) {
    super(paymentRepository);
    this.paymentRepository = paymentRepository;
  }

  async getVnpUrl(paymentId: string, ipAddr: string): Promise<GetVnpUrl> {
    const payment = await this.paymentRepository.findOne({
      filter: {
        id: paymentId
      }
    });

    if (!payment) {
      throw new BaseError(ErrorCode.NF_01, 'Payment not found');
    }

    //Get total amount
    const total = payment.total;

    //Get orderId
    const orderId = payment.orderId;

    //Get url from VNPAY
    const payUrl = createVNPayUrl(total, ipAddr, orderId);

    return new GetVnpUrl(payUrl);
  }
}
