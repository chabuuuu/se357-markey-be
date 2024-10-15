import { ShoppingCart } from '@/models/shopping_cart.model';
import { IShoppingCartRepository } from '@/repository/interface/i.shopping_cart.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IShoppingCartService } from '@/service/interface/i.shopping_cart.service';
import { inject, injectable } from 'inversify';

@injectable()
export class ShoppingCartService extends BaseCrudService<ShoppingCart> implements IShoppingCartService<ShoppingCart> {
private shoppingCartRepository: IShoppingCartRepository<ShoppingCart>;

constructor(@inject('ShoppingCartRepository') shoppingCartRepository: IShoppingCartRepository<ShoppingCart>) {
super(shoppingCartRepository);
this.shoppingCartRepository = shoppingCartRepository;
}
}