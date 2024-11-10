import { OrderStatusEnum } from '@/enums/order-status.enum';
import { BaseEntity } from '@/models/base_model.model';
import { OrderItem } from '@/models/order_item.model';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('orders')
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'int',
    nullable: false
  })
  total!: number;

  @Column({
    type: 'enum',
    enum: OrderStatusEnum,
    default: OrderStatusEnum.NOT_PAID
  })
  status!: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100
  })
  address!: string;

  @Column()
  shopperId!: string;

  @Column({ nullable: true })
  shopId?: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    cascade: true
  })
  items!: OrderItem[];

  @Column({ name: 'payment_id', nullable: true })
  paymentId?: string;
}
