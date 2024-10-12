import { ICategory } from '@/models/category.model';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

type Category = {
  id: string;
};

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

  @IsString()
  @IsOptional()
  @Expose()
  picture?: string;

  @IsOptional()
  @Expose()
  detail!: any;

  @Expose()
  tags!: string[];

  //fk

  @Expose()
  category!: Category;
}
