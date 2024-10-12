import { ShoppingCartController } from '@/controller/shopping_cart.controller';
import { ShoppingCartService } from '@/service/shopping_cart.service';
import ShoppingCart, { IShoppingCart } from '@/models/shopping_cart.model';
import { ShoppingCartRepository } from '@/repository/shopping_cart.repository';
import { IShoppingCartService } from '@/service/interface/i.shopping_cart.service';
import { IShoppingCartRepository } from '@/repository/interface/i.shopping_cart.repository';
import { BaseContainer } from '@/container/base.container';

class ShoppingCartContainer extends BaseContainer {
  constructor() {
    super(ShoppingCart);
    this.container.bind<IShoppingCartService<IShoppingCart>>('ShoppingCartService').to(ShoppingCartService);
    this.container.bind<IShoppingCartRepository<IShoppingCart>>('ShoppingCartRepository').to(ShoppingCartRepository);
    this.container.bind<ShoppingCartController>(ShoppingCartController).toSelf();
  }

  export() {
    const shoppingCartController = this.container.get<ShoppingCartController>(ShoppingCartController);
    const shoppingCartService = this.container.get<IShoppingCartService<any>>('ShoppingCartService');
    return { shoppingCartController, shoppingCartService };
  }
}

const shoppingCartContainer = new ShoppingCartContainer();
const { shoppingCartController, shoppingCartService } = shoppingCartContainer.export();
export { shoppingCartController, shoppingCartService };
