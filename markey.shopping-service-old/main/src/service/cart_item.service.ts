import { ICartItem } from '@/models/cart_item.model';
import { ICartItemRepository } from '@/repository/interface/i.cart_item.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { ICartItemService } from '@/service/interface/i.cart_item.service';
import { inject, injectable } from 'inversify';

@injectable()
export class CartItemService extends BaseCrudService<ICartItem> implements ICartItemService<ICartItem> {
  private cartItemRepository: ICartItemRepository<ICartItem>;

  constructor(@inject('CartItemRepository') cartItemRepository: ICartItemRepository<ICartItem>) {
    super(cartItemRepository);
    this.cartItemRepository = cartItemRepository;
  }
}
