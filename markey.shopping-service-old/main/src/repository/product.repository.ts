import { BaseRepository } from '@/repository/base/base.repository';
import { IProductRepository } from '@/repository/interface/i.product.repository';
import Product, { IProduct } from '@/models/product.model';
import 'reflect-metadata';

export class ProductRepository extends BaseRepository<IProduct> implements IProductRepository<IProduct> {
  constructor() {
    super(Product);
  }
}