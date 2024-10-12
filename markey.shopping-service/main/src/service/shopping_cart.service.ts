import ShoppingCart, { IShoppingCart } from '@/models/shopping_cart.model';
import { IShoppingCartRepository } from '@/repository/interface/i.shopping_cart.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IShoppingCartService } from '@/service/interface/i.shopping_cart.service';
import { inject, injectable } from 'inversify';

@injectable()
export class ShoppingCartService extends BaseCrudService<IShoppingCart> implements IShoppingCartService<IShoppingCart> {
  private shoppingCartRepository: IShoppingCartRepository<IShoppingCart>;

  constructor(@inject('ShoppingCartRepository') shoppingCartRepository: IShoppingCartRepository<IShoppingCart>) {
    super(shoppingCartRepository);
    this.shoppingCartRepository = shoppingCartRepository;
  }
}
