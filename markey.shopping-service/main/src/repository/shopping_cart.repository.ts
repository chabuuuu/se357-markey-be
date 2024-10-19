import { ShoppingCart } from '@/models/shopping_cart.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { IShoppingCartRepository } from '@/repository/interface/i.shopping_cart.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource, FindOptionsSelect } from 'typeorm';

export class ShoppingCartRepository
  extends BaseRepository<ShoppingCart>
  implements IShoppingCartRepository<ShoppingCart>
{
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(ShoppingCart));
  }
}
