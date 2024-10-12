import { IsNotEmpty, IsString } from 'class-validator';

export class AdminLoginReq {
  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;
}
