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
}