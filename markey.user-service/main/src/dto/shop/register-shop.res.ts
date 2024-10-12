import { Expose } from 'class-transformer';

export class RegisterShopRes {
  @Expose()
  id!: string;

  @Expose()
  name!: string;

  @Expose()
  profilePicture?: string;

  @Expose()
  description?: string;
}
