import { Product } from '@/models/product.model';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
  Check,
  ManyToOne,
  JoinColumn,
  Index
} from 'typeorm';

@Entity('product_ratings')
@Index(['shopperId', 'productId'], { unique: true })
export class ProductRating extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'integer',
    nullable: false
  })
  @Check(`"rating" >= 1 AND "rating" <= 5`)
  rating!: number;

  @Column({
    type: 'varchar',
    length: 250,
    nullable: true
  })
  comment?: string;

  @Column({
    name: 'product_id'
  })
  productId!: string;

  @Column({
    name: 'shopper_id'
  })
  shopperId!: string;

  @ManyToOne(() => Product, (product) => product.productRatings, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'product_id' })
  product!: Promise<Product>;
}
