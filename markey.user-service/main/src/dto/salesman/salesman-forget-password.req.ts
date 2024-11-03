import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class SalesmanForgetPasswordReq {
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber!: string;
}
