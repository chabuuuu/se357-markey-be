import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { JwtClaimDto } from '@/dto/jwt-claim.dto';
import { ErrorCode } from '@/enums/error-code.enums';
import { RoleNameEnum } from '@/enums/role-name.enum';
import { IShoppingCart } from '@/models/shopping_cart.model';
import { IShoppingCartService } from '@/service/interface/i.shopping_cart.service';
import { ITYPES } from '@/types/interface.types';
import BaseError from '@/utils/error/base.error';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class ShoppingCartController {
  public common: IBaseCrudController<IShoppingCart>;
  private shoppingCartService: IShoppingCartService<IShoppingCart>;
  constructor(
    @inject('ShoppingCartService') shoppingCartService: IShoppingCartService<IShoppingCart>,
    @inject(ITYPES.Controller) common: IBaseCrudController<IShoppingCart>
  ) {
    this.shoppingCartService = shoppingCartService;
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

  async createCart(req: Request, res: Response, next: NextFunction) {
    try {
      const { shopperId } = req.body;
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

  async addToCart(req: Request, res: Response, next: NextFunction) {
    try {
      const shopper = this.getShopperCurrentlyLoggedIn(req);

      await this.shoppingCartService.addToCart(shopper.id, req.body);
      res.send_ok('Thêm sản phẩm vào giỏ hàng thành công');
    } catch (error) {
      next(error);
    }
  }

  async getMyCart(req: Request, res: Response, next: NextFunction) {
    try {
      const shopper = this.getShopperCurrentlyLoggedIn(req);

      const result = await this.shoppingCartService.getCart(shopper.id);

      res.send_ok('Lấy thông tin giỏ hàng thành công', result);
    } catch (error) {
      next(error);
    }
  }
}
