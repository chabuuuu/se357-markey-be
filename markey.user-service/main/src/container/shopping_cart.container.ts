import { IShoppingCartRepository } from '@/repository/interface/i.shopping_cart.repository';
import { ShoppingCartRepository } from '@/repository/shopping_cart.repository';
import { Container } from 'inversify';

class ShoppingCartContainer {
  private container = new Container();
  constructor() {
    this.container.bind<IShoppingCartRepository>('ShoppingCartRepository').to(ShoppingCartRepository);
  }

  export() {
    const shoppingCartRepository = this.container.get<IShoppingCartRepository>('ShoppingCartRepository');

    return { shoppingCartRepository };
  }
}

const shoppingCartContainer = new ShoppingCartContainer();
const { shoppingCartRepository } = shoppingCartContainer.export();
export { shoppingCartRepository };
