import { CategoryController } from '@/controller/category.controller';
import { CategoryService } from '@/service/category.service';
import { Category } from '@/models/category.model';
import { CategoryRepository } from '@/repository/category.repository';
import { ICategoryService } from '@/service/interface/i.category.service';
import { ICategoryRepository } from '@/repository/interface/i.category.repository';
import { BaseContainer } from '@/container/base.container';

class CategoryContainer extends BaseContainer {
  constructor() {
    super(Category);
    this.container.bind<ICategoryService<Category>>('CategoryService').to(CategoryService);
    this.container.bind<ICategoryRepository<Category>>('CategoryRepository').to(CategoryRepository);
    this.container.bind<CategoryController>(CategoryController).toSelf();
  }

  export() {
    const categoryController = this.container.get<CategoryController>(CategoryController);
    const categoryService = this.container.get<ICategoryService<any>>('CategoryService');
    return { categoryController, categoryService };
  }
}

const categoryContainer = new CategoryContainer();
const { categoryController, categoryService } = categoryContainer.export();
export { categoryController, categoryService };
