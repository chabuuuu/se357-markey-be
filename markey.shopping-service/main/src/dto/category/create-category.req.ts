import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCategoryReq {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name!: string;

  @IsOptional()
  picture?: string;
}
