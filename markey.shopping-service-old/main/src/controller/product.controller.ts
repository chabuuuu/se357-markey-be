import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { IProduct } from '@/models/product.model';
import { IProductService } from '@/service/interface/i.product.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class ProductController {
  public common: IBaseCrudController<IProduct>;
  private productService: IProductService<IProduct>;
  constructor(
    @inject('ProductService') productService: IProductService<IProduct>,
    @inject(ITYPES.Controller) common: IBaseCrudController<IProduct>
  ) {
    this.productService = productService;
    this.common = common;
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.productService.findMany({
        filter: {},
        relations: ['category']
      });

      res.send_ok('Lấy danh sách sản phẩm thành công', result);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.productService.createProduct(req.body);

      res.send_created('Tạo sản phẩm mới thành công', result);
    } catch (error) {
      next(error);
    }
  }
}
