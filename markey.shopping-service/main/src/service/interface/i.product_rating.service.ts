import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface IProductRatingService<T extends BaseModelType> extends IBaseCrudService<T> {
  getAvarageRating(productId: string): Promise<number>;
}
