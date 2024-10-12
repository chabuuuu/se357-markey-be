import { Shopper } from '@/models/shopper.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { IShopperRepository } from '@/repository/interface/i.shopper.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class ShopperRepository extends BaseRepository<Shopper> implements IShopperRepository<Shopper> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Shopper));
  }
}
