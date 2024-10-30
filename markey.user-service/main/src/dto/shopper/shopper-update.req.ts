import { IsOptional } from 'class-validator';

export class ShopperUpdateReq {
  @IsOptional()
  profilePicture!: string;
  @IsOptional()
  fullname!: string;
  @IsOptional()
  address!: string;
  @IsOptional()
  birthdate!: Date;
}
