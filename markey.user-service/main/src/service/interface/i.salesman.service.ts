import { PagingResponseDto } from '@/dto/paging-response.dto';
import { PagingDto } from '@/dto/paging.dto';
import { SalesmanChangePasswordReq } from '@/dto/salesman/salesman-change-password.req';
import { SearchSalesmanReq } from '@/dto/salesman/salesman-filter.res';
import { SalesmanForgetPasswordReq } from '@/dto/salesman/salesman-forget-password.req';
import { SalesmanLoginReq } from '@/dto/salesman/salesman-login.req';
import { SalesmanLoginRes } from '@/dto/salesman/salesman-login.res';
import { SalesmanRegisterReq } from '@/dto/salesman/salesman-register.req';
import { SalesmanRegisterRes } from '@/dto/salesman/salesman-register.res';
import { SalesmanResetPasswordReq } from '@/dto/salesman/salesman-reset-password';
import { Salesman } from '@/models/salesman.model';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface ISalesmanService<T extends BaseModelType> extends IBaseCrudService<T> {
  changePassword(shopperId: string, data: SalesmanChangePasswordReq): Promise<void>;
  findWithFilter(filter: SearchSalesmanReq, paging: PagingDto): Promise<PagingResponseDto<Salesman>>;
  login(data: SalesmanLoginReq): Promise<SalesmanLoginRes>;
  verifyEmailToken(email: string, token: string): Promise<void>;
  activateEmail(salesmanId: string, email: string): Promise<void>;
  approve(salesmanId: string): Promise<void>;
  activatePhoneNumber(phoneNumber: string, code: string): Promise<string>;
  register(data: SalesmanRegisterReq): Promise<SalesmanRegisterRes>;
  deleteBySalesmanId(salesmanId: string): Promise<void>;
  forgetPassword(data: SalesmanForgetPasswordReq): Promise<void>;
  resetPassword(data: SalesmanResetPasswordReq): Promise<void>;
}
