import { CreateShopReq } from '@/dto/shop/create-shop.req';

export interface IShopRepository {
  createShop(data: CreateShopReq): Promise<void>;
}
