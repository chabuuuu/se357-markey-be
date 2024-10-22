import { CreateShopReq } from '@/dto/shop/create-shop.req';
import { IShopRepository } from '@/repository/interface/i.shop.repository';
import { GlobalConfig } from '@/utils/config/global-config.util';
import axios from 'axios';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class ShopRepository implements IShopRepository {
  private shoppingServiceUrl = GlobalConfig.microservices.shopping.url;

  /**
   * * Call shopping service to create shop
   * @param data
   */
  async createShop(data: CreateShopReq): Promise<void> {
    const endpoint = GlobalConfig.microservices.shopping.api.create_shop.endpoint;

    // Call with axios to shopping service to create shop
    const response = await axios.post(`${this.shoppingServiceUrl}${endpoint}`, data);

    console.log('Shop created:', response.data);
  }
}
