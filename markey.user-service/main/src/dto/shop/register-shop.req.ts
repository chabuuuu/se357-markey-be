import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class RegisterShopReq {
  @IsNotEmpty()
  @MaxLength(70)
  @Expose()
  name!: string;

  @IsOptional()
  @Expose()
  profilePicture?: string;

  @IsOptional()
  @Expose()
  description?: string;
}
