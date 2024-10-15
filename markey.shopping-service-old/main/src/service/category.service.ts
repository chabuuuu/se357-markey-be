import { ICategory } from '@/models/category.model';
import { ICategoryRepository } from '@/repository/interface/i.category.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { ICategoryService } from '@/service/interface/i.category.service';
import { inject, injectable } from 'inversify';

@injectable()
export class CategoryService extends BaseCrudService<ICategory> implements ICategoryService<ICategory> {
private categoryRepository: ICategoryRepository<ICategory>;

constructor(@inject('CategoryRepository') categoryRepository: ICategoryRepository<ICategory>) {
super(categoryRepository);
this.categoryRepository = categoryRepository;
}
}