import { GetCartGroupByCreatedAt } from '@/dto/cart/get-cart-group-by-created-date.res';
import { IBaseRepository } from '@/repository/interface/i.base.repository';

export interface IShoppingCartRepository<T> extends IBaseRepository<T> {}
