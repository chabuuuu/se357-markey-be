import { CreateRatingReq } from '@/dto/rating/create-rating.req';
import { GetRatingByProductRes } from '@/dto/rating/get-rating-by-product.res';
import { ShopperRes } from '@/dto/service_communicate/shopper.res';
import { ErrorCode } from '@/enums/error-code.enums';
import { Product } from '@/models/product.model';
import { ProductRating } from '@/models/product_rating.model';
import { IProductRepository } from '@/repository/interface/i.product.repository';
import { IProductRatingRepository } from '@/repository/interface/i.product_rating.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IProductRatingService } from '@/service/interface/i.product_rating.service';
import { GlobalConfig } from '@/utils/config/global-config.util';
import { convertToDto } from '@/utils/dto-convert/convert-to-dto.util';
import BaseError from '@/utils/error/base.error';
import axios from 'axios';
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
   * Get tất cả đánh giá của sản phẩm ( đồng thời trả về thêm số lượng rating 5 sao, 4 sao,..., 1 sao của sản phẩm đó)
   * @param productId
   */
  async findByProductId(productId: string): Promise<GetRatingByProductRes> {
    const product = await this.productRepository.findOne({
      filter: {
        id: productId
      }
    });

    if (!product) {
      throw new BaseError(ErrorCode.NF_01, 'Product not found');
    }

    const ratings = await this.productRatingRepository.findMany({
      filter: {
        productId: productId
      }
    });

    const ratingCount = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0
    };

    ratings.forEach((rating) => {
      const key = rating.rating as 1 | 2 | 3 | 4 | 5;
      ratingCount[key]++;
    });

    const result = new GetRatingByProductRes();

    result.ratings = ratings;
    result.totalRating1 = ratingCount[1];
    result.totalRating2 = ratingCount[2];
    result.totalRating3 = ratingCount[3];
    result.totalRating4 = ratingCount[4];
    result.totalRating5 = ratingCount[5];
    result.average = product.ratingAverage;

    return result;
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

    // 0. Get shopper detail from user service

    const userServiceUrl = GlobalConfig.microservices.user.url;

    const endpoint = GlobalConfig.microservices.user.api.get_shopper_detail.endpoint;

    // Call with axios to shopping service to create shop
    const response = await axios.get(`${userServiceUrl}${endpoint}` + shopperId);

    const shopperRes = convertToDto(ShopperRes, response.data.data);

    //Adding shopper detail to rating

    (data as unknown as ProductRating).shopper = shopperRes;

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
