import { PaymentMethodEnum } from '@/enums/payment-method.enum';
import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderReq {
  @Expose()
  @IsNotEmpty()
  @IsString()
  address!: string;

  @IsNotEmpty()
  @IsEnum(PaymentMethodEnum)
  paymentMethod!: string;
}
