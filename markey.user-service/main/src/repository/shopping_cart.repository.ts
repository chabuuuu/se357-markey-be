import { CreateCartReq } from '@/dto/cart/create-cart.req';
import { IShoppingCartRepository } from '@/repository/interface/i.shopping_cart.repository';
import { GlobalConfig } from '@/utils/config/global-config.util';
import axios from 'axios';
import { injectable } from 'inversify';

@injectable()
export class ShoppingCartRepository implements IShoppingCartRepository {
  private shoppingServiceUrl = GlobalConfig.microservices.shopping.url;

  /**
   * * Call shopping service to create cart
   * @param data
   * @returns
   */
  async createCart(data: CreateCartReq): Promise<void> {
    const endpoint = GlobalConfig.microservices.shopping.api.create_shopping_cart.endpoint;

    // Call with axios to shopping service to get cart by shopper id
    const response = await axios.post(`${this.shoppingServiceUrl}${endpoint}`, data);

    console.log('Cart created:', response.data);

    return;
  }
}
