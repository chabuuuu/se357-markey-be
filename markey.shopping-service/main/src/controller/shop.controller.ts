import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { Shop } from '@/models/shop.model';
import { IShopService } from '@/service/interface/i.shop.service';
import { ITYPES } from '@/types/interface.types';
import { SessionUtil } from '@/utils/session-util';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class ShopController {
  public common: IBaseCrudController<Shop>;
  private shopService: IShopService<Shop>;
  constructor(
    @inject('ShopService') shopService: IShopService<Shop>,
    @inject(ITYPES.Controller) common: IBaseCrudController<Shop>
  ) {
    this.shopService = shopService;
    this.common = common;
  }

  /**
   * * PUT /shop/:id
   * @param req
   * @param res
   * @param next
   */
  async salesmanUpdateShop(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const salesman = SessionUtil.getSalesmanCurrentlyLoggedIn(req);

      const salesmanId = salesman.id;

      await this.shopService.salesmanUpdateShop(id, salesmanId!, req.body);

      res.status(200).send_ok('Update shop success');
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /shop/by-salesman/:salesmanId
   */
  async findBySalesman(req: Request, res: Response, next: NextFunction) {
    try {
      const { salesmanId } = req.params;

      const shops = await this.shopService.findOne({
        filter: {
          salesmanId: salesmanId
        }
      });

      res.status(200).send_ok('Get shops by salesmanId success', shops);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /shop/me
   */
  async getMyShop(req: Request, res: Response, next: NextFunction) {
    try {
      const salesman = SessionUtil.getSalesmanCurrentlyLoggedIn(req);

      const shop = await this.shopService.findOne({
        filter: {
          salesmanId: salesman.id
        }
      });

      res.status(200).send_ok('Get shop success', shop);
    } catch (error) {
      next(error);
    }
  }
}
