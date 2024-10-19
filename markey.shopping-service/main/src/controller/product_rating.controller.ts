import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { JwtClaimDto } from '@/dto/jwt-claim.dto';
import { ErrorCode } from '@/enums/error-code.enums';
import { RoleNameEnum } from '@/enums/role-name.enum';
import { ProductRating } from '@/models/product_rating.model';
import { IProductRatingService } from '@/service/interface/i.product_rating.service';
import { ITYPES } from '@/types/interface.types';
import BaseError from '@/utils/error/base.error';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class ProductRatingController {
  public common: IBaseCrudController<ProductRating>;
  private productRatingService: IProductRatingService<ProductRating>;
  constructor(
    @inject('ProductRatingService') productRatingService: IProductRatingService<ProductRating>,
    @inject(ITYPES.Controller) common: IBaseCrudController<ProductRating>
  ) {
    this.productRatingService = productRatingService;
    this.common = common;
  }
  getShopperCurrentlyLoggedIn(req: Request): JwtClaimDto {
    const user = req.user;
    if (user?.roleName !== RoleNameEnum.shopper) {
      throw new BaseError(
        ErrorCode.PERMISSION_01,
        'Chỉ người dùng có quyền shopper mới có thể thêm sản phẩm vào giỏ hàng'
      );
    }
    if (!user.id) {
      throw new BaseError(ErrorCode.VALIDATION_ERROR, 'Không tìm thấy thông tin người dùng');
    }

    return user;
  }

  /**
   * * POST /product_rating/
   */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      const shopper = this.getShopperCurrentlyLoggedIn(req);

      const shopperId = shopper.id;

      data.shopperId = shopperId;

      const result = await this.productRatingService.create({
        data: data
      });

      return res.send_ok('Created successfully', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /product_rating/:id
   */
  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.productRatingService.findOne({
        filter: {
          id: req.params.id
        },
        relations: ['product']
      });

      return res.send_ok('Found successfully', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /product-rating/by-product/:productId
   */
  async findByProductId(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.productRatingService.findMany({
        filter: {
          productId: req.params.productId
        }
      });

      return res.send_ok('Found successfully', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /product-rating/avarage/:productId
   */
  async getAvarageRating(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.productRatingService.getAvarageRating(req.params.productId);

      return res.send_ok('Rating avarage is', {
        average: result
      });
    } catch (error) {
      next(error);
    }
  }
}
