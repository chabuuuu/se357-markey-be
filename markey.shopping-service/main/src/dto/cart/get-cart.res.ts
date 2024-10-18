import { ProductInCartRes } from '@/dto/product/product-in-cart.res';
import { Expose } from 'class-transformer';

export class GetCartRes {
  @Expose()
  shoppingCartId!: string;

  @Expose()
  products!: ProductInCartRes[];
}
