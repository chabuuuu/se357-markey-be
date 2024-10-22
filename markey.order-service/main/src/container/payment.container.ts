import { IPaymentRepository } from '@/repository/interface/i.payment.repository';
import { PaymentRepository } from '@/repository/payment.repository';
import { Container } from 'inversify';

class PaymentContainer {
  private container = new Container();
  constructor() {
    this.container.bind<IPaymentRepository>('PaymentRepository').to(PaymentRepository);
  }

  export() {
    const paymentRepository = this.container.get<IPaymentRepository>('PaymentRepository');

    return { paymentRepository };
  }
}

const paymentContainer = new PaymentContainer();
const { paymentRepository } = paymentContainer.export();
export { paymentRepository };
