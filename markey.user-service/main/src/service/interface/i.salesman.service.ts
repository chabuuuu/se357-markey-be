import { PagingResponseDto } from '@/dto/paging-response.dto';
import { PagingDto } from '@/dto/paging.dto';
import { SearchSalesmanReq } from '@/dto/salesman/salesman-filter.res';
import { SalesmanLoginReq } from '@/dto/salesman/salesman-login.req';
import { SalesmanLoginRes } from '@/dto/salesman/salesman-login.res';
import { SalesmanRegisterReq } from '@/dto/salesman/salesman-register.req';
import { SalesmanRegisterRes } from '@/dto/salesman/salesman-register.res';
import { Salesman } from '@/models/salesman.model';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface ISalesmanService<T extends BaseModelType> extends IBaseCrudService<T> {
  findWithFilter(filter: SearchSalesmanReq, paging: PagingDto): Promise<PagingResponseDto<Salesman>>;
  login(data: SalesmanLoginReq): Promise<SalesmanLoginRes>;
  verifyEmailToken(email: string, token: string): Promise<void>;
  activateEmail(salesmanId: string, email: string): Promise<void>;
  approve(salesmanId: string): Promise<void>;
  activatePhoneNumber(phoneNumber: string, code: string): Promise<string>;
  register(data: SalesmanRegisterReq): Promise<SalesmanRegisterRes>;
  deleteBySalesmanId(salesmanId: string): Promise<void>;
}
