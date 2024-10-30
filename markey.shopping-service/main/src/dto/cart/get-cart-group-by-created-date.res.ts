import { ProductInCartRes } from '@/dto/product/product-in-cart.res';
import { Expose } from 'class-transformer';

export class GetCartGroupByCreatedAt {
  @Expose()
  shoppingCartId!: string;

  group!: {
    addedAt: Date;
    products: ProductInCartRes[];
  }[];

  @Expose()
  total!: number;
}
