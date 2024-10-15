import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { ShoppingCart } from '@/models/shopping_cart.model';
import { IShoppingCartService } from '@/service/interface/i.shopping_cart.service';
import { ITYPES } from '@/types/interface.types';
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
}