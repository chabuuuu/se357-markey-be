import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateRatingReq {
  @IsNotEmpty()
  @IsNumber()
  @Max(5)
  @Min(1)
  rating!: number;

  @IsNotEmpty()
  @IsString()
  comment?: string;

  @IsNotEmpty()
  productId!: string;
}
