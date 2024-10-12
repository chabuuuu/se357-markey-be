import { IsNotEmpty, IsString } from 'class-validator';

export class SalesmanLoginReq {
  @IsString()
  @IsNotEmpty()
  phoneNumberOrEmail!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
