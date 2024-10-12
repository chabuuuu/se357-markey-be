import ShoppingCart, { IShoppingCart } from '@/models/shopping_cart.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { IShoppingCartRepository } from '@/repository/interface/i.shopping_cart.repository';
import 'reflect-metadata';

export class ShoppingCartRepository
  extends BaseRepository<IShoppingCart>
  implements IShoppingCartRepository<IShoppingCart>
{
  constructor() {
    super(ShoppingCart);
  }
}
