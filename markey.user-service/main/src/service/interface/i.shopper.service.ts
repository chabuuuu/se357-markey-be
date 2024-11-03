import { MessageRes } from '@/dto/message-response.res';
import { PagingResponseDto } from '@/dto/paging-response.dto';
import { PagingDto } from '@/dto/paging.dto';
import { ShopperLoginReq } from '@/dto/shopper/shopper-login.req';
import { ShopperLoginRes } from '@/dto/shopper/shopper-login.res';
import { ShopperRegisterReq } from '@/dto/shopper/shopper-register.req';
import { ShopperSearchReq } from '@/dto/shopper/shopper-search.req';
import { ShopperValidateRegisterReq } from '@/dto/shopper/shopper-valiate-registr.req';
import { ShopperRes } from '@/dto/shopper/shopper.res';
import { Shopper } from '@/models/shopper.model';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface IShopperService<T extends BaseModelType> extends IBaseCrudService<T> {
  findWithFilter(filter: ShopperSearchReq, paging: PagingDto): Promise<PagingResponseDto<Shopper>>;
  validationRegister(data: ShopperValidateRegisterReq): Promise<void>;
  login(data: ShopperLoginReq): Promise<ShopperLoginRes>;
  register(data: ShopperRegisterReq): Promise<ShopperRes>;
  verifyEmailToken(email: string, token: string): Promise<void>;
  activateEmail(shopperId: string, email: string): Promise<void>;
  activatePhoneNumber(phoneNumber: string, code: string): Promise<string>;
}
