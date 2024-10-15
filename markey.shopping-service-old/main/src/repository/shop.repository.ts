import { BaseRepository } from '@/repository/base/base.repository';
import { IShopRepository } from '@/repository/interface/i.shop.repository';
import Shop, { IShop } from '@/models/shop.model';
import 'reflect-metadata';

export class ShopRepository extends BaseRepository<IShop> implements IShopRepository<IShop> {
  constructor() {
    super(Shop);
  }
}
