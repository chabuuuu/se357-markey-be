import { PostCategoryEnum } from '@/enums/post-category.enum';
import { PostLangTypeEnum } from '@/enums/post-lang-type.enum';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostReq {
  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsEnum(PostCategoryEnum)
  category!: string;

  @IsOptional()
  tags?: string[];

  @IsNotEmpty()
  @IsString()
  content!: string;

  @IsEnum(PostLangTypeEnum)
  lang_type!: string;

  //Genrate later
  shopId!: string;

  createBy!: string;
}
