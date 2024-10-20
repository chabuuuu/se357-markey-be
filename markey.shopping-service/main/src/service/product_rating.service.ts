import { CreateRatingReq } from '@/dto/rating/create-rating.req';
import { ErrorCode } from '@/enums/error-code.enums';
import { Product } from '@/models/product.model';
import { ProductRating } from '@/models/product_rating.model';
import { IProductRepository } from '@/repository/interface/i.product.repository';
import { IProductRatingRepository } from '@/repository/interface/i.product_rating.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IProductRatingService } from '@/service/interface/i.product_rating.service';
import BaseError from '@/utils/error/base.error';
import { inject, injectable } from 'inversify';

@injectable()
export class ProductRatingService
  extends BaseCrudService<ProductRating>
  implements IProductRatingService<ProductRating>
{
  private productRatingRepository: IProductRatingRepository<ProductRating>;
  private productRepository: IProductRepository<Product>;

  constructor(
    @inject('ProductRatingRepository') productRatingRepository: IProductRatingRepository<ProductRating>,
    @inject('ProductRepository') productRepository: IProductRepository<Product>
  ) {
    super(productRatingRepository);
    this.productRatingRepository = productRatingRepository;
    this.productRepository = productRepository;
  }

  /**
   * * Salesman create new rating
   *  This function will create a new rating for a product and update the average rating of that product
   * @param data
   * @param shopperId
   */
  async createRating(data: CreateRatingReq, shopperId: string): Promise<ProductRating> {
    const product = await this.productRepository.findOne({
      filter: {
        id: data.productId
      }
    });

    if (!product) {
      throw new BaseError(ErrorCode.NF_01, 'Product not found');
    }

    // 1. Create new rating
    const rating = await this.productRatingRepository.create({
      data: {
        ...data,
        shopperId: shopperId
      }
    });

    //2. Update rating average for that product

    const averageRating = product.ratingAverage;

    const newAverageRating = averageRating ? (averageRating + rating.rating) / 2 : rating.rating;

    await this.productRepository.findOneAndUpdate({
      filter: {
        id: product.id
      },
      updateData: {
        ratingAverage: newAverageRating
      }
    });

    return rating;
  }

  async getAvarageRating(productId: string): Promise<number | undefined> {
    const product = await this.productRepository.findOne({
      filter: {
        id: productId
      }
    });

    if (!product) {
      throw new BaseError(ErrorCode.NF_01, 'Product not found');
    }

    return product.ratingAverage;
  }
}
