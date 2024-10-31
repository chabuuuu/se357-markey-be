import { OrderStatusEnum } from '@/enums/order-status.enum';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateOrderStatus {
  @IsNotEmpty()
  status!: string;
}
