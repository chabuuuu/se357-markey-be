import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { ICategory } from '@/models/category.model';
import { ICategoryService } from '@/service/interface/i.category.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class CategoryController {
  public common: IBaseCrudController<ICategory>;
  private categoryService: ICategoryService<ICategory>;
  constructor(
    @inject('CategoryService') categoryService: ICategoryService<ICategory>,
    @inject(ITYPES.Controller) common: IBaseCrudController<ICategory>
  ) {
    this.categoryService = categoryService;
    this.common = common;
  }
}
