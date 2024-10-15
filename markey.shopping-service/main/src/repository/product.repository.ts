import { Product } from '@/models/product.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { IProductRepository } from '@/repository/interface/i.product.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class ProductRepository extends BaseRepository<Product> implements IProductRepository<Product> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Product));
  }
}
