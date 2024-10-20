import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { PagingDto } from '@/dto/paging.dto';
import { CreateProductReq } from '@/dto/product/create-product.req';
import { ListProductSelect } from '@/dto/product/list-product.select';
import { RoleNameEnum } from '@/enums/role-name.enum';
import { Product } from '@/models/product.model';
import { IProductService } from '@/service/interface/i.product.service';
import { ITYPES } from '@/types/interface.types';
import { convertToDto } from '@/utils/dto-convert/convert-to-dto.util';
import { getPagingUtil } from '@/utils/get-paging.util';
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

  /**
   * * POST /product/
   */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      const salesman = req.user;

      if (salesman?.roleName !== RoleNameEnum.salesman) {
        return res.send_forbidden('You are not a salesman');
      }

      const result = await this.productService.createWithSalesmanId(data, salesman.id);
      return res.send_ok('Created successfully', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /product/
   */
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.productService.findMany({
        relations: ['category', 'shop'],
        select: ListProductSelect
      });

      return res.send_ok('Found successfully', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /product/:id
   */
  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.productService.findOne({
        filter: {
          id: req.params.id
        },
        relations: ['category', 'shop']
      });

      return res.send_ok('Found successfully', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /product/paging
   */
  async findWithPaging(req: Request, res: Response, next: NextFunction) {
    try {
      const paging = getPagingUtil(req);

      const result = await this.productService.findAllWithPaging({
        paging: paging,
        relations: ['category', 'shop'],
        select: ListProductSelect
      });
      return res.send_ok('Found successfully', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /product/by-shop/:shopId
   */
  async findByShopId(req: Request, res: Response, next: NextFunction) {
    try {
      const paging = getPagingUtil(req);
      const shopId = req.params.shopId;
      const result = await this.productService.findWithPaging({
        filter: {
          shopId: shopId
        },
        relations: ['category', 'shop'],
        select: ListProductSelect,
        paging: paging
      });

      return res.send_ok('Found successfully', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /product/by-category/:categoryId
   */
  async findByCategoryId(req: Request, res: Response, next: NextFunction) {
    try {
      const paging = getPagingUtil(req);
      const categoryId = req.params.categoryId;
      const result = await this.productService.findWithPaging({
        filter: {
          categoryId: categoryId
        },
        relations: ['category', 'shop'],
        select: ListProductSelect,
        paging: paging
      });

      return res.send_ok('Found successfully', result);
    } catch (error) {
      next(error);
    }
  }
}
