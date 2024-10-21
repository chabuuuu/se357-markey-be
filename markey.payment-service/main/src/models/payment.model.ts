import { OrderDto } from '@/dto/oder.dto';
import { PaymentMethodEnum } from '@/enums/payment-method.enum';
import { PaymentStatusEnum } from '@/enums/payment-status.enum';
import { BaseEntity } from '@/models/base_model.model';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payments')
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'order_id' })
  orderId!: string;

  @Column({ name: 'payment_method', type: 'enum', enum: PaymentMethodEnum, default: PaymentMethodEnum.COD })
  paymentMethod!: string;

  @Column({ name: 'total' })
  total!: number;

  @Column({ name: 'payment_info', type: 'jsonb', nullable: true })
  paymentInfo?: any;

  @Column({ name: 'order', type: 'jsonb', nullable: false })
  order!: OrderDto;

  @Column({
    type: 'enum',
    enum: PaymentStatusEnum,
    default: PaymentStatusEnum.NOT_PAID
  })
  status!: string;
}
