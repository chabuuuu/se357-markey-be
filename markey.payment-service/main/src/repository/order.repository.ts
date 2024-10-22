import { PaymentCreatedEventDto } from '@/dto/payment/payment-created-event.dto';
import { IOrderRepository } from '@/repository/interface/i.order.repository';
import { GlobalConfig } from '@/utils/config/global-config.util';
import axios from 'axios';
import { injectable } from 'inversify';

@injectable()
export class OrderRepository implements IOrderRepository {
  private orderServiceUrl = GlobalConfig.microservices.order.url;

  /**
   * * Call to order service to send paid event
   * @param data
   */
  async sendPaidEvent(data: PaymentCreatedEventDto): Promise<void> {
    const endpoint = GlobalConfig.microservices.order.api.send_paid_event.endpoint;

    // Call with axios to shopping service to get cart by shopper id
    const response = await axios.put(`${this.orderServiceUrl}${endpoint}`, data);

    console.log('Event created:', response.data);

    return;
  }
}
