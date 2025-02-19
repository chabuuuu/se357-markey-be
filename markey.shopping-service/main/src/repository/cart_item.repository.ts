import { CartItem } from '@/models/cart_item.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { ICartItemRepository } from '@/repository/interface/i.cart_item.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource, FindOptionsSelect } from 'typeorm';

export class CartItemRepository extends BaseRepository<CartItem> implements ICartItemRepository<CartItem> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(CartItem));
  }
}
