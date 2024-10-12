import { ExposeAll } from '@/decorators/expose-all.decorator';
import { IsNotEmptyAll } from '@/decorators/is-not-empty-all.decorator';
import { Expose } from 'class-transformer';
import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MaxLength } from 'class-validator';

@IsNotEmptyAll
export class ShopperRegisterReq {
  @IsString()
  @MaxLength(50)
  @Expose()
  username!: string;

  @IsString()
  @Expose()
  password!: string;

  @IsString()
  @MaxLength(70)
  @Expose()
  fullname!: string;

  @IsString()
  @MaxLength(100)
  @Expose()
  address!: string;

  @IsString()
  @IsPhoneNumber()
  @Expose()
  phoneNumber!: string;

  @IsDateString()
  @Expose()
  birthdate!: Date;

  @IsString()
  @IsEmail()
  @MaxLength(50)
  @Expose()
  email!: string;

  @IsString()
  @IsOptional()
  @Expose()
  profilePicture?: string;
}
