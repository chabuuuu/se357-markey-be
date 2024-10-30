import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { JwtClaimDto } from '@/dto/jwt-claim.dto';
import { ErrorCode } from '@/enums/error-code.enums';
import { RoleNameEnum } from '@/enums/role-name.enum';
import { ShoppingCart } from '@/models/shopping_cart.model';
import { IShoppingCartService } from '@/service/interface/i.shopping_cart.service';
import { ITYPES } from '@/types/interface.types';
import BaseError from '@/utils/error/base.error';
import { SessionUtil } from '@/utils/session-util';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class ShoppingCartController {
  public common: IBaseCrudController<ShoppingCart>;
  private shoppingCartService: IShoppingCartService<ShoppingCart>;
  constructor(
    @inject('ShoppingCartService') shoppingCartService: IShoppingCartService<ShoppingCart>,
    @inject(ITYPES.Controller) common: IBaseCrudController<ShoppingCart>
  ) {
    this.shoppingCartService = shoppingCartService;
    this.common = common;
  }

  /**
   * * POST /cart/
   * @param req
   * @param res
   * @param next
   */
  async createCart(req: Request, res: Response, next: NextFunction) {
    try {
      const { shopperId } = req.body;

      //Check if shopper already has a cart
      if (
        await this.shoppingCartService.exists({
          filter: {
            shopperId: shopperId
          }
        })
      ) {
        throw new BaseError(ErrorCode.VALIDATION_ERROR, 'Người dùng đã có giỏ hàng');
      }
      const cart = await this.shoppingCartService.create({
        data: {
          shopperId: shopperId
        }
      });
      res.status(201).send_ok('Tạo giỏ hàng thành công', cart);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * POST /cart/add
   * @param req
   * @param res
   * @param next
   */
  async addToCart(req: Request, res: Response, next: NextFunction) {
    try {
      const shopper = SessionUtil.getShopperCurrentlyLoggedIn(req);

      await this.shoppingCartService.addToCart(shopper.id, req.body);
      res.send_ok('Thêm sản phẩm vào giỏ hàng thành công');
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /cart/me
   * @param req
   * @param res
   * @param next
   */
  async getMyCart(req: Request, res: Response, next: NextFunction) {
    try {
      const shopper = SessionUtil.getShopperCurrentlyLoggedIn(req);

      const result = await this.shoppingCartService.getCart(shopper.id);

      res.send_ok('Lấy thông tin giỏ hàng thành công', result);
    } catch (error) {
      next(error);
    }
  }

  /*
   * * GET /cart/by-shopper/:shopperId
   * @param req
   * @param res
   * @param next
   */
  async getCartByShopper(req: Request, res: Response, next: NextFunction) {
    try {
      const { shopperId } = req.params;
      const result = await this.shoppingCartService.getCart(shopperId);

      res.send_ok('Lấy thông tin giỏ hàng thành công', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /cart/me/group-by-created-date
   */
  async getMyCartGroupByCreatedDate(req: Request, res: Response, next: NextFunction) {
    try {
      const shopper = SessionUtil.getShopperCurrentlyLoggedIn(req);

      const result = await this.shoppingCartService.getCartGroupByCreatedDate(shopper.id);

      res.send_ok('Lấy thông tin giỏ hàng thành công', result);
    } catch (error) {
      next(error);
    }
  }
}
