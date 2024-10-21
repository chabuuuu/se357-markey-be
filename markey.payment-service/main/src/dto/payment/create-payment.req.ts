import { OrderDto } from '@/dto/oder.dto';
import { PaymentMethodEnum } from '@/enums/payment-method.enum';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePaymentReq {
  @IsNotEmpty()
  @IsString()
  orderId!: string;

  @IsEnum(PaymentMethodEnum)
  @IsNotEmpty()
  paymentMethod!: string;

  @IsNotEmpty()
  total!: number;

  order!: OrderDto;
}
