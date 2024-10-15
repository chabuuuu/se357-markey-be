import { Category } from '@/models/category.model';
import { ICategoryRepository } from '@/repository/interface/i.category.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { ICategoryService } from '@/service/interface/i.category.service';
import { inject, injectable } from 'inversify';

@injectable()
export class CategoryService extends BaseCrudService<Category> implements ICategoryService<Category> {
private categoryRepository: ICategoryRepository<Category>;

constructor(@inject('CategoryRepository') categoryRepository: ICategoryRepository<Category>) {
super(categoryRepository);
this.categoryRepository = categoryRepository;
}
}