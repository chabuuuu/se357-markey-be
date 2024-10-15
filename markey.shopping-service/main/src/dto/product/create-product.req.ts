import { Expose } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductReq {
  @IsNotEmpty()
  @IsString()
  @Expose()
  name!: string;

  @IsString()
  @IsOptional()
  @Expose()
  description!: string;

  @IsNotEmpty()
  @Expose()
  price!: number;

  @IsNotEmpty()
  @Expose()
  quantity!: number;

  @IsArray()
  @IsOptional()
  @Expose()
  picture?: string[];

  @IsOptional()
  @Expose()
  detail?: Record<string, string>;

  @Expose()
  @IsArray()
  @IsOptional()
  tags?: string[];

  @Expose()
  @IsNotEmpty()
  @IsString()
  categoryId!: string;
}
