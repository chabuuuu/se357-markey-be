import { ShopperRes } from '@/dto/shopper/shopper.res';
import { Expose, Type } from 'class-transformer';

export class ShopperPagingRes {
  @Expose()
  total!: number;
  @Expose()
  @Type(() => ShopperRes)
  items!: Array<ShopperRes>;
}
