import { GenderTypeEnum } from '@/constants/gender-type.enum';
import { IsEnum, IsOptional } from 'class-validator';

export class ShopperUpdateReq {
  @IsOptional()
  profilePicture?: string;
  @IsOptional()
  fullname?: string;
  @IsOptional()
  address?: string;
  @IsOptional()
  birthdate?: Date;
  @IsOptional()
  @IsEnum(GenderTypeEnum)
  gender?: string;
}
