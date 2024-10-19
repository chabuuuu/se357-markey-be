import { ProductRating } from '@/models/product_rating.model';
import { IProductRatingRepository } from '@/repository/interface/i.product_rating.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IProductRatingService } from '@/service/interface/i.product_rating.service';
import { inject, injectable } from 'inversify';

@injectable()
export class ProductRatingService
  extends BaseCrudService<ProductRating>
  implements IProductRatingService<ProductRating>
{
  private productRatingRepository: IProductRatingRepository<ProductRating>;

  constructor(@inject('ProductRatingRepository') productRatingRepository: IProductRatingRepository<ProductRating>) {
    super(productRatingRepository);
    this.productRatingRepository = productRatingRepository;
  }

  async getAvarageRating(productId: string): Promise<number> {
    const ratings = await this.productRatingRepository.findMany({
      filter: {
        productId: productId
      }
    });

    if (ratings.length === 0) {
      return 0;
    }

    let totalRating = 0;

    ratings.forEach((rating) => {
      totalRating += rating.rating;
    });

    console.log('totalRating', totalRating);

    return totalRating / ratings.length;
  }
}
