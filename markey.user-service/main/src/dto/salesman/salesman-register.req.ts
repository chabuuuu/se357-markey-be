import { RegisterShopReq } from '@/dto/shop/register-shop.req';
import { ErrorCode } from '@/enums/error-code.enums';
import { LoginTypeEnum } from '@/enums/login-type.enum';
import BaseError from '@/utils/error/base.error';
import { Expose, Transform, Type } from 'class-transformer';
import {
  isArray,
  IsArray,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  ValidationError
} from 'class-validator';

export class SalesmanRegisterReq {
  @IsNotEmpty()
  @IsString()
  @Expose()
  password!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(70)
  @Expose()
  fullname!: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Expose()
  address?: string;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  @Expose()
  phoneNumber!: string;

  @IsOptional()
  @IsDateString()
  @Expose()
  birthdate?: Date;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(50)
  @Expose()
  email!: string;

  @IsOptional()
  @IsString()
  @MaxLength(70)
  @Expose()
  cccd?: string;

  @IsOptional()
  // @Transform(({ value }) => {
  //   //Check if value is an array
  //   if (!isArray(value)) {
  //     throw new BaseError(ErrorCode.VALIDATION_ERROR, 'Your request body is not valid', ['Attachment is not an array']);
  //   }
  //   console.log('value', value.join(','));

  //   return value.join(',');
  // })
  @Expose()
  //@IsString()
  attachments?: string;

  @IsNotEmpty()
  @Expose()
  @Type(() => RegisterShopReq)
  shop!: RegisterShopReq;
}
