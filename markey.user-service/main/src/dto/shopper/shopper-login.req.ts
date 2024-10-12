import { ExposeAll } from '@/decorators/expose-all.decorator';
import { IsNotEmptyAll } from '@/decorators/is-not-empty-all.decorator';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@IsNotEmptyAll
export class ShopperLoginReq {
  @Expose()
  @IsString()
  phoneNumberOrEmail!: string;
  @Expose()
  @IsString()
  password!: string;
}
