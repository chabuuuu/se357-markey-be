import { MessageResponseDto } from '@/dto/message-response.dto';
import { UpdateShopReq } from '@/dto/shop/update-shop.req';
import { IBaseCrudService } from '@/service/interface/i.base.service';

export interface IShopService<T> extends IBaseCrudService<T> {
  salesmanUpdateShop(shopId: string, salesmanId: string, updateData: UpdateShopReq): Promise<MessageResponseDto>;
}
