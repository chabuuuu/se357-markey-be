import { GetCartRes } from '@/dto/shopping-service/get-cart.res';
import { ICartRepository } from '@/repository/interface/i.cart.repository';
import { GlobalConfig } from '@/utils/config/global-config.util';
import { convertToDto } from '@/utils/dto-convert/convert-to-dto.util';
import axios from 'axios';
import { injectable } from 'inversify';

@injectable()
export class CartRepository implements ICartRepository {
  private shoppingServiceUrl = GlobalConfig.microservices.shopping.url;
  async findByShopperId(shopperId: string): Promise<GetCartRes> {
    const endpoint = GlobalConfig.microservices.shopping.api.get_shopping_cart.endpoint;

    // Call with axios to shopping service to get cart by shopper id
    const response = await axios.get(`${this.shoppingServiceUrl}${endpoint}/${shopperId}`);

    const cart = convertToDto(GetCartRes, response.data.data);

    return cart;
  }
}
