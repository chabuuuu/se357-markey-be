import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class ShopperForgetPasswordReq {
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber!: string;
}
