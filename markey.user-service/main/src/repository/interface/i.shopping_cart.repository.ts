import { CreateCartReq } from '@/dto/cart/create-cart.req';

export interface IShoppingCartRepository {
  createCart(data: CreateCartReq): Promise<void>;
}
