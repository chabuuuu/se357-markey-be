import { ProductDto } from '@/dto/product.dto';
import { OrderStatusEnum } from '@/enums/order-status.enum';
import { BaseEntity } from '@/models/base_model.model';
import { Order } from '@/models/order.model';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from 'typeorm';

@Entity('order_items')
@Index('order_item_order_id_product_id_unique', ['orderId', 'productId'], { unique: true })
export class OrderItem extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'int',
    nullable: false
  })
  amount!: number;

  @Column({
    type: 'jsonb'
  })
  product!: ProductDto;

  @Column({ name: 'product_id' })
  productId!: string;

  @Column({ name: 'order_id' })
  orderId!: string;

  @ManyToOne(() => Order, (order) => order.id)
  @JoinColumn({ name: 'order_id' })
  order!: Order;
}
