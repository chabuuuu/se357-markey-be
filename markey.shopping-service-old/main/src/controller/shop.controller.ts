import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { MessageResponseDto } from '@/dto/message-response.dto';
import { IShop } from '@/models/shop.model';
import { IShopService } from '@/service/interface/i.shop.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class ShopController {
  public common: IBaseCrudController<IShop>;
  private shopService: IShopService<IShop>;
  constructor(
    @inject('ShopService') shopService: IShopService<IShop>,
    @inject(ITYPES.Controller) common: IBaseCrudController<IShop>
  ) {
    this.shopService = shopService;
    this.common = common;
  }

  async salesmanUpdateShop(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const salesmanId = req.user?.id;
      const shop: MessageResponseDto = await this.shopService.salesmanUpdateShop(id, salesmanId!, req.body);
      res.status(200).send_ok('Update shop success', shop);
    } catch (error) {
      next(error);
    }
  }
}
