import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { PagingDto } from '@/dto/paging.dto';
import { CreateProductReq } from '@/dto/product/create-product.req';
import { FindProductReq } from '@/dto/product/find-product.req';
import { ListProductSelect } from '@/dto/product/list-product.select';
import { UpdateProductReq } from '@/dto/product/update-product.req';
import { RoleNameEnum } from '@/enums/role-name.enum';
import { Product } from '@/models/product.model';
import { IProductService } from '@/service/interface/i.product.service';
import { ISearchService } from '@/service/interface/i.search.service';
import { ITYPES } from '@/types/interface.types';
import { convertToDto } from '@/utils/dto-convert/convert-to-dto.util';
import { getPagingUtil } from '@/utils/get-paging.util';
import { normalizeTextUtil } from '@/utils/normalize-text.util';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { IsNull, Not } from 'typeorm';

@injectable()
export class ProductController {
  public common: IBaseCrudController<Product>;
  private productService: IProductService<Product>;
  private searchService: ISearchService;
  constructor(
    @inject('ProductService') productService: IProductService<Product>,
    @inject(ITYPES.Controller) common: IBaseCrudController<Product>,
    @inject('SearchService') searchService: ISearchService
  ) {
    this.productService = productService;
    this.common = common;
    this.searchService = searchService;
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

  /**
   * * GET /product/with-filter
   * @param req
   * @param res
   * @param next
   * @returns
   */
  async findWithFilter(req: Request, res: Response, next: NextFunction) {
    try {
      const paging = getPagingUtil(req);
      const filter: FindProductReq = req.body;
      const result = await this.productService.findWithFilter(filter, paging);

      return res.send_ok('Found successfully', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /product/recommend
   */
  async recommend(req: Request, res: Response, next: NextFunction) {
    try {
      const paging = getPagingUtil(req);
      const result = await this.productService.findMany({
        paging: paging,
        relations: ['category', 'shop'],
        filter: {
          ratingAverage: Not(IsNull()) as any
        },
        select: ListProductSelect,
        order: [
          {
            column: 'ratingAverage',
            direction: 'DESC'
          }
        ]
      });

      const totalRecords = await this.productService.count({
        filter: {
          ratingAverage: Not(IsNull()) as any
        }
      });
      const resultWithPaging = {
        items: result,
        total: totalRecords
      };

      return res.send_ok('Found successfully', resultWithPaging);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * PUT /product/:id
   */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data: UpdateProductReq = req.body;
      const id = req.params.id;

      if (data.name) {
        (data as unknown as Product).nameForSearch = normalizeTextUtil(data.name);
      }

      const result = await this.productService.findOneAndUpdate({
        filter: {
          id: id
        },
        updateData: data
      });

      return res.send_ok('Updated successfully', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * DELETE /product/:id
   */
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;

      await this.productService.findOneAndDelete({
        filter: {
          id: id
        }
      });

      return res.send_ok('Deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}
