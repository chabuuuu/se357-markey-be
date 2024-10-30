import { PostLangTypeEnum } from '@/enums/post-lang-type.enum';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdatePostReq {
  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsOptional()
  categoryId!: string;

  @IsOptional()
  tags?: string[];

  @IsOptional()
  @IsString()
  content!: string;

  @IsOptional()
  @IsEnum(PostLangTypeEnum)
  lang_type!: string;
}
