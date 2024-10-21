import { CartRepository } from '@/repository/cart.repository';
import { ICartRepository } from '@/repository/interface/i.cart.repository';
import { Container } from 'inversify';

class CartContainer {
  private container = new Container();
  constructor() {
    this.container.bind<ICartRepository>('CartRepository').to(CartRepository);
  }

  export() {
    const cartRepository = this.container.get<ICartRepository>('CartRepository');

    return { cartRepository };
  }
}

const cartContainer = new CartContainer();
const { cartRepository } = cartContainer.export();
export { cartRepository };
