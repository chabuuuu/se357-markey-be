import { CreateRatingReq } from '@/dto/rating/create-rating.req';
import { ProductRating } from '@/models/product_rating.model';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface IProductRatingService<T extends BaseModelType> extends IBaseCrudService<T> {
  createRating(data: CreateRatingReq, shopperId: string): Promise<ProductRating>;
  getAvarageRating(productId: string): Promise<number | undefined>;
}
