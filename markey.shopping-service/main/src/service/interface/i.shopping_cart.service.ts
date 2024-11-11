import { AddToCartReq } from '@/dto/cart/add-to-cart.req';
import { GetCartGroupByCreatedAt } from '@/dto/cart/get-cart-group-by-created-date.res';
import { GetCartRes } from '@/dto/cart/get-cart.res';
import { UpdateCartReq } from '@/dto/cart/udpate-cart.req';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface IShoppingCartService<T extends BaseModelType> extends IBaseCrudService<T> {
  updateToCart(id: string, data: UpdateCartReq): Promise<void>;
  getCartGroupByCreatedDate(shopperId: string): Promise<GetCartGroupByCreatedAt>;
  getCart(shopperId: string): Promise<GetCartRes>;
  addToCart(shopperId: string, data: AddToCartReq): Promise<void>;
}
