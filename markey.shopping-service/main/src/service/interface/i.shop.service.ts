import { UpdateShopReq } from '@/dto/shop/update-shop.req';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface IShopService<T extends BaseModelType> extends IBaseCrudService<T> {
  salesmanUpdateShop(shopId: string, salesmanId: string, updateData: UpdateShopReq): Promise<void>;
}
