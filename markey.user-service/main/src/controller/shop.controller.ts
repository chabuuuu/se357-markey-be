import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { Shop } from '@/models/shop.model';
import { IShopService } from '@/service/interface/i.shop.service';
import { ITYPES } from '@/types/interface.types';
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
}
