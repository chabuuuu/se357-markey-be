import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { Product } from '@/models/product.model';
import { IProductService } from '@/service/interface/i.product.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class ProductController {
public common: IBaseCrudController<Product>;
private productService: IProductService<Product>;
constructor(
@inject('ProductService') productService: IProductService<Product>,
@inject(ITYPES.Controller) common: IBaseCrudController<Product>
) {
this.productService = productService;
this.common = common;
}
}