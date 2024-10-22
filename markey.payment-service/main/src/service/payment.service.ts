import { GetVnpUrl } from '@/dto/payment/get-vnp-url.res';
import { ErrorCode } from '@/enums/error-code.enums';
import { PaymentMethodEnum } from '@/enums/payment-method.enum';
import { PaymentStatusEnum } from '@/enums/payment-status.enum';
import { Payment } from '@/models/payment.model';
import { IOrderRepository } from '@/repository/interface/i.order.repository';
import { IPaymentRepository } from '@/repository/interface/i.payment.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IPaymentService } from '@/service/interface/i.payment.service';
import BaseError from '@/utils/error/base.error';
import { createVNPayUrl } from '@/utils/vnpay/create-pay-url.util';
import { inject, injectable } from 'inversify';

@injectable()
export class PaymentService extends BaseCrudService<Payment> implements IPaymentService<Payment> {
  private paymentRepository: IPaymentRepository<Payment>;
  private orderRepository: IOrderRepository;

  constructor(
    @inject('PaymentRepository') paymentRepository: IPaymentRepository<Payment>,
    @inject('OrderRepository') orderRepository: IOrderRepository
  ) {
    super(paymentRepository);
    this.paymentRepository = paymentRepository;
    this.orderRepository = orderRepository;
  }

  /**
   * * Handle VNPay return
   * @param vnp_Params
   */
  async handleVNPayReturn(vnp_Params: any): Promise<void> {
    const orderId = vnp_Params['vnp_TxnRef'];
    const amount = Number(vnp_Params['vnp_Amount']) / 100;
    const bankCode = vnp_Params['vnp_BankCode'];
    const cardType = vnp_Params['vnp_CardType'];
    const orderInfo = vnp_Params['vnp_OrderInfo'];
    delete vnp_Params['vnp_BankCode'];
    delete vnp_Params['vnp_CardType'];
    delete vnp_Params['vnp_OrderInfo'];
    delete vnp_Params['vnp_TxnRef'];
    delete vnp_Params['vnp_Amount'];
    const paycheckInfo = vnp_Params;

    const payment = await this.paymentRepository.findOne({
      filter: {
        orderId: orderId
      }
    });

    if (!payment) {
      throw new BaseError(ErrorCode.NF_01, 'Không tìm thấy đơn hàng');
    }

    if (payment.total !== amount) {
      throw new BaseError(
        ErrorCode.VALIDATION_ERROR,
        'Số tiền không khớp, phải trả ' + payment.total + ' nhưng đã trả ' + amount
      );
    }

    payment.status = PaymentStatusEnum.PAID;
    payment.paymentInfo = {
      bankCode,
      cardType,
      orderInfo,
      paycheckInfo
    };

    await this.paymentRepository.save(payment);

    //Send paid event to order service
    this.orderRepository.sendPaidEvent({
      id: payment.id,
      orderId: payment.orderId,
      paymentMethod: PaymentMethodEnum.VNPAY,
      total: payment.total,
      paymentInfo: payment.paymentInfo,
      status: payment.status
    });

    return;
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
