import { ShoppingCartController } from '@/controller/shopping_cart.controller';
import { ShoppingCartService } from '@/service/shopping_cart.service';
import { ShoppingCart } from '@/models/shopping_cart.model';
import { ShoppingCartRepository } from '@/repository/shopping_cart.repository';
import { IShoppingCartService } from '@/service/interface/i.shopping_cart.service';
import { IShoppingCartRepository } from '@/repository/interface/i.shopping_cart.repository';
import { BaseContainer } from '@/container/base.container';
import { ICartItemRepository } from '@/repository/interface/i.cart_item.repository';
import { cartItemRepository } from '@/container/cart_item.container';

class ShoppingCartContainer extends BaseContainer {
  constructor() {
    super(ShoppingCart);
    this.container.bind<IShoppingCartService<ShoppingCart>>('ShoppingCartService').to(ShoppingCartService);
    this.container.bind<IShoppingCartRepository<ShoppingCart>>('ShoppingCartRepository').to(ShoppingCartRepository);
    this.container.bind<ShoppingCartController>(ShoppingCartController).toSelf();

    //Import
    this.container.bind<ICartItemRepository<any>>('CartItemRepository').toConstantValue(cartItemRepository);
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
