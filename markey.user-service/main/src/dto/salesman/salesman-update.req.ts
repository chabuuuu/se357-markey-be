import { ErrorCode } from '@/enums/error-code.enums';
import { LoginTypeEnum } from '@/enums/login-type.enum';
import BaseError from '@/utils/error/base.error';
import { Expose, Transform } from 'class-transformer';
import {
  IsOptional,
  IsString,
  MaxLength,
  IsPhoneNumber,
  IsDateString,
  IsEmail,
  IsEnum,
  isArray
} from 'class-validator';

export class SalesmanUpdateReq {
  @IsOptional()
  @IsString()
  @Expose()
  password?: string;

  @IsOptional()
  @IsString()
  @MaxLength(70)
  @Expose()
  fullname?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Expose()
  address?: string;

  @IsOptional()
  @IsString()
  @IsPhoneNumber()
  @Expose()
  phoneNumber?: string;

  @IsOptional()
  @IsDateString()
  @Expose()
  birthdate?: Date;

  @IsOptional()
  @IsString()
  @IsEmail()
  @MaxLength(50)
  @Expose()
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(70)
  @Expose()
  cccd?: string;

  @IsOptional()
  @Transform(({ value }) => {
    //Check if value is an array
    if (!isArray(value)) {
      throw new BaseError(ErrorCode.VALIDATION_ERROR, 'Your request body is not valid', ['Attachment is not an array']);
    }
    console.log('value', value.join(','));

    return value.join(',');
  })
  @Expose()
  @IsString()
  @IsOptional()
  attachments?: string;
}
