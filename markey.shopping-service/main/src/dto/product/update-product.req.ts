import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';

export class UpdateProductReq {
  @IsOptional()
  @IsString()
  @Expose()
  name?: string;

  @IsString()
  @IsOptional()
  @Expose()
  description?: string;

  @IsOptional()
  @Expose()
  price?: number;

  @IsOptional()
  @Expose()
  quantity?: number;

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
  @IsOptional()
  @IsString()
  categoryId?: string;
}
