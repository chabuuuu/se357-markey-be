import { BaseRes } from '@/dto/base.res';
import { Expose } from 'class-transformer';

export class ShopDetailRes extends BaseRes {
  @Expose()
  id!: string;

  @Expose()
  name!: string;

  @Expose()
  profilePicture?: string;

  @Expose()
  description?: string;
}
