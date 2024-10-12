import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { IShoppingCart } from '@/models/shopping_cart.model';

import { IShoppingCartService } from '@/service/interface/i.shopping_cart.service';
import { ITYPES } from '@/types/interface.types';
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
}
