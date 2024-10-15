import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { Category } from '@/models/category.model';
import { ICategoryService } from '@/service/interface/i.category.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class CategoryController {
  public common: IBaseCrudController<Category>;
  private categoryService: ICategoryService<Category>;
  constructor(
    @inject('CategoryService') categoryService: ICategoryService<Category>,
    @inject(ITYPES.Controller) common: IBaseCrudController<Category>
  ) {
    this.categoryService = categoryService;
    this.common = common;
  }

  /**
   * POST /categories/
   */
  async create(req: Request, res: Response, next: NextFunction) {
    return this.common.create(req, res, next);
  }

  /**
   * GET /categories/
   */
  async findAll(req: Request, res: Response, next: NextFunction) {
    return this.common.findAll(req, res, next);
  }

  /**
   * GET /categories/:id
   */
  async findOne(req: Request, res: Response, next: NextFunction) {
    return this.common.findOne(req, res, next);
  }

  /**
   * PUT /categories/:id
   */
  async update(req: Request, res: Response, next: NextFunction) {
    return this.common.update(req, res, next);
  }

  /**
   * DELETE /categories/:id
   */
  async delete(req: Request, res: Response, next: NextFunction) {
    return this.common.delete(req, res, next);
  }

  /**
   * * GET /categories/paging
   */
  async findWithPaging(req: Request, res: Response, next: NextFunction) {
    return this.common.findWithPaging(req, res, next);
  }
}
