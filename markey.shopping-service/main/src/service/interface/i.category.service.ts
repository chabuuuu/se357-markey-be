import { JwtClaimDto } from '@/dto/jwt-claim.dto';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface ICategoryService<T extends BaseModelType> extends IBaseCrudService<T> {
  canDeleteOrNot(user: JwtClaimDto, categoryId: string): Promise<void>;
}
