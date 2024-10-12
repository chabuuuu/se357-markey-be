import { IsNotEmptyAll } from '@/decorators/is-not-empty-all.decorator';
import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

@IsNotEmptyAll
export class EmailActivateReq {
  @IsString()
  @IsEmail()
  @Expose()
  email!: string;
}
