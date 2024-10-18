import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRatingReq {
  @IsNotEmpty()
  rating!: number;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsNotEmpty()
  productId!: string;

  // After receive
  shopperId!: string;
}
