import { ProductInCartRes } from '@/dto/shopping-service/product-in-cart.res';
import { Expose, Type } from 'class-transformer';

export class GetCartRes {
  @Expose()
  shoppingCartId!: string;

  @Expose()
  @Type(() => ProductInCartRes)
  products!: ProductInCartRes[];

  @Expose()
  total!: number;
}
