import { AdminLoginReq } from '@/dto/admin/admin-login.req';
import { AdminLoginRes } from '@/dto/admin/admin-login.res';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface IAdminService<T extends BaseModelType> extends IBaseCrudService<T> {
  approveSalesman(salesmanId: string): Promise<void>;
  login(data: AdminLoginReq): Promise<AdminLoginRes>;
}
