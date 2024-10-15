import { Shop } from '@/models/shop.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { IShopRepository } from '@/repository/interface/i.shop.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class ShopRepository extends BaseRepository<Shop> implements IShopRepository<Shop> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Shop));
  }
}
