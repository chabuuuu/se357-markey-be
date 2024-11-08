import { IsNotEmpty, IsString } from 'class-validator';

export class ShopperChangePasswordReq {
  @IsNotEmpty()
  @IsString()
  oldPassword!: string;

  @IsNotEmpty()
  @IsString()
  newPassword!: string;
}
