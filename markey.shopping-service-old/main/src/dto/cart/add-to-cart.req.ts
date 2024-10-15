import { IsNotEmpty, IsString } from 'class-validator';

export class AddToCartReq {
  @IsNotEmpty()
  @IsString()
  productId!: string;

  @IsNotEmpty()
  amount!: number;
}
