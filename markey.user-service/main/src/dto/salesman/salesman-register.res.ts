import { RegisterShopRes } from '@/dto/shop/register-shop.res';
import { Expose, Type } from 'class-transformer';

export class SalesmanRegisterRes {
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
  @Type(() => RegisterShopRes)
  shop!: RegisterShopRes;
}
