import { Expose } from 'class-transformer';

export class ProductInCartRes {
  @Expose()
  id!: string;
  @Expose()
  name!: string;
  @Expose()
  description?: string;
  @Expose()
  price!: number;
  @Expose()
  picture?: string[];
  @Expose()
  amount!: number;
  @Expose()
  shopId!: string;
}
