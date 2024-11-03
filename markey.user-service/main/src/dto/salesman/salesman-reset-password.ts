import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class SalesmanResetPasswordReq {
  @IsNotEmpty()
  password!: string;
  @IsNotEmpty()
  code!: string;
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber!: string;
}
