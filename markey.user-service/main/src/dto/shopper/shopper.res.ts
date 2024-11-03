import { ExposeAll } from '@/decorators/expose-all.decorator';
import { BaseRes } from '@/dto/base.res';
import { Expose } from 'class-transformer';

export class ShopperRes extends BaseRes {
  @Expose()
  id!: string;
  @Expose()
  username!: string;
  @Expose()
  fullname!: string;
  @Expose()
  address!: string;
  @Expose()
  phoneNumber!: string;
  @Expose()
  birthdate!: Date;
  @Expose()
  gender!: string;
  @Expose()
  email!: string;
  @Expose()
  isBlocked!: boolean;
  @Expose()
  profilePicture?: string;
}
