import { CreateRatingReq } from '@/dto/rating/create-rating.req';
import { GetRatingByProductRes } from '@/dto/rating/get-rating-by-product.res';
import { ProductRating } from '@/models/product_rating.model';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface IProductRatingService<T extends BaseModelType> extends IBaseCrudService<T> {
  findByProductId(productId: string): Promise<GetRatingByProductRes>;
  createRating(data: CreateRatingReq, shopperId: string): Promise<ProductRating>;
  getAvarageRating(productId: string): Promise<number | undefined>;
}
