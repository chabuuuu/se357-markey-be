import { BaseRepository } from '@/repository/base/base.repository';
import { ICategoryRepository } from '@/repository/interface/i.category.repository';
import Category, { ICategory } from '@/models/category.model';
import 'reflect-metadata';

export class CategoryRepository extends BaseRepository<ICategory> implements ICategoryRepository<ICategory> {
  constructor() {
    super(Category);
  }
}