import { BaseRepository } from '@/repository/base/base.repository';
import { ICartItemRepository } from '@/repository/interface/i.cart_item.repository';
import CartItem, { ICartItem } from '@/models/cart_item.model';
import 'reflect-metadata';

export class CartItemRepository extends BaseRepository<ICartItem> implements ICartItemRepository<ICartItem> {
  constructor() {
    super(CartItem);
  }
}