import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryReq {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  picture?: string;
}
