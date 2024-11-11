import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { JwtClaimDto } from '@/dto/jwt-claim.dto';
import { CreateRatingReq } from '@/dto/rating/create-rating.req';
import { ErrorCode } from '@/enums/error-code.enums';
import { RoleNameEnum } from '@/enums/role-name.enum';
import { ProductRating } from '@/models/product_rating.model';
import { IProductRatingService } from '@/service/interface/i.product_rating.service';
import { ITYPES } from '@/types/interface.types';
import BaseError from '@/utils/error/base.error';
import { SessionUtil } from '@/utils/session-util';
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

  /**
   * * POST /product_rating/
   */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data: CreateRatingReq = req.body;

      const shopper = SessionUtil.getShopperCurrentlyLoggedIn(req);

      const shopperId = shopper.id;

      const result = await this.productRatingService.createRating(data, shopperId);

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
      const result = await this.productRatingService.findByProductId(req.params.productId);

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

  /**
   * * GET /product-rating/have-rated
   * * Get rating of the product by the shopper
   */
  async haveRated(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.productRatingService.findOne({
        filter: {
          shopperId: req.query.shopperId as string,
          productId: req.query.productId as string
        }
      });

      return res.send_ok('Found successfully', result);
    } catch (error) {
      next(error);
    }
  }
}
