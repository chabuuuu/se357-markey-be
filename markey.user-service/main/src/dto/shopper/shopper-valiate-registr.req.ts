import { IsNotEmpty } from 'class-validator';

export class ShopperValidateRegisterReq {
  @IsNotEmpty()
  phoneNumber!: string;
  @IsNotEmpty()
  email!: string;
}
