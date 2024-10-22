import { IOrderRepository } from '@/repository/interface/i.order.repository';
import { OrderRepository } from '@/repository/order.repository';
import { Container } from 'inversify';

class OrderContainer {
  private container = new Container();
  constructor() {
    this.container.bind<IOrderRepository>('OrderRepository').to(OrderRepository);
  }

  export() {
    const orderRepository = this.container.get<IOrderRepository>('OrderRepository');

    return { orderRepository };
  }
}

const orderContainer = new OrderContainer();
const { orderRepository } = orderContainer.export();
export { orderRepository };
