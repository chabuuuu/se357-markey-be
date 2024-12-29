import { JwtClaimDto } from '@/dto/jwt-claim.dto';
import { ErrorCode } from '@/enums/error-code.enums';
import { Category } from '@/models/category.model';
import { ICategoryRepository } from '@/repository/interface/i.category.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { ICategoryService } from '@/service/interface/i.category.service';
import BaseError from '@/utils/error/base.error';
import { inject, injectable } from 'inversify';

@injectable()
export class CategoryService extends BaseCrudService<Category> implements ICategoryService<Category> {
  private categoryRepository: ICategoryRepository<Category>;

  constructor(@inject('CategoryRepository') categoryRepository: ICategoryRepository<Category>) {
    super(categoryRepository);
    this.categoryRepository = categoryRepository;
  }
  async canDeleteOrNot(user: JwtClaimDto, categoryId: string): Promise<void> {
    if (user.roleName !== 'admin') {
      throw new BaseError(ErrorCode.MSG32, "You don't have permission to delete this category");
    }
  }
}
