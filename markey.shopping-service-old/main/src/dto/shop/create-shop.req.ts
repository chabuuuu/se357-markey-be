import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateShopReq {
  @Expose()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @Expose()
  @IsOptional()
  @IsString()
  profilePicture?: string;

  @Expose()
  @IsOptional()
  @IsString()
  description?: string;

  //fks
  @Expose()
  @IsNotEmpty()
  @IsString()
  salesmanId!: string;
}
