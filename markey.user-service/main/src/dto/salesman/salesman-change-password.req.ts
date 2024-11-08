import { IsNotEmpty, IsString } from 'class-validator';

export class SalesmanChangePasswordReq {
  @IsNotEmpty()
  @IsString()
  oldPassword!: string;

  @IsNotEmpty()
  @IsString()
  newPassword!: string;
}
