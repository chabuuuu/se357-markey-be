import { IsNotEmpty, IsOptional, IsString, Max, MaxLength } from 'class-validator';

export class UpdateCategoryReq {
  @IsOptional()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  picture?: string;
}
