import { BaseRes } from '@/dto/base.res';
import { ShopDetailRes } from '@/dto/shop/shop-detail.res';
import { Expose, Type } from 'class-transformer';

export class SalesmanDetailRes extends BaseRes {
  @Expose()
  id!: string;
  @Expose()
  fullname!: string;
  @Expose()
  address!: string;
  @Expose()
  phoneNumber!: string;
  @Expose()
  birthdate!: Date;
  @Expose()
  email!: string;
  @Expose()
  loginType!: string;
  @Expose()
  cccd!: string;
  @Expose()
  attachments!: string;
  @Expose()
  @Type(() => ShopDetailRes)
  shop!: ShopDetailRes;
}
