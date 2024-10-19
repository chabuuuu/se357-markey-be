import { AddToCartReq } from '@/dto/cart/add-to-cart.req';
import { GetCartRes } from '@/dto/cart/get-cart.res';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface IShoppingCartService<T extends BaseModelType> extends IBaseCrudService<T> {
  getCart(shopperId: string): Promise<GetCartRes>;
  addToCart(shopperId: string, data: AddToCartReq): Promise<void>;
}
