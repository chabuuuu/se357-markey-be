import { BaseContainer } from '@/container/base.container';
import { CartItem } from '@/models/cart_item.model';
import { CartItemRepository } from '@/repository/cart_item.repository';
import { ICartItemRepository } from '@/repository/interface/i.cart_item.repository';

class CartItemContainer extends BaseContainer {
  constructor() {
    super(CartItem);
    this.container.bind<ICartItemRepository<CartItem>>('CartItemRepository').to(CartItemRepository);
  }

  export() {
    const cartItemRepository = this.container.get<ICartItemRepository<CartItem>>('CartItemRepository');
    return { cartItemRepository };
  }
}

const cartItemContainer = new CartItemContainer();
const { cartItemRepository } = cartItemContainer.export();
export { cartItemRepository };
