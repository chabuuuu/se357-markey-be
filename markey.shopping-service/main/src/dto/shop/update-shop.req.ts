import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class UpdateShopReq {
  @Expose()
  @IsOptional()
  @IsString()
  name?: string;

  @Expose()
  @IsOptional()
  @IsString()
  profilePicture?: string;

  @Expose()
  @IsOptional()
  @IsString()
  description?: string;
}
