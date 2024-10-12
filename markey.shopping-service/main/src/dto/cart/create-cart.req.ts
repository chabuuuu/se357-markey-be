import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCartReq {
  @IsNotEmpty()
  @IsString()
  shopperId!: string;
}
