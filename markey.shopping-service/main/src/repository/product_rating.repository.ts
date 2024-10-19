import { ProductRating } from '@/models/product_rating.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { IProductRatingRepository } from '@/repository/interface/i.product_rating.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class ProductRatingRepository extends BaseRepository<ProductRating> implements IProductRatingRepository<ProductRating> {
constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
super(dataSource.getRepository(ProductRating));
}
}