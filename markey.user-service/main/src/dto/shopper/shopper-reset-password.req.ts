import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class ShopperResetPasswordReq {
  @IsNotEmpty()
  password!: string;
  @IsNotEmpty()
  code!: string;
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber!: string;
}
