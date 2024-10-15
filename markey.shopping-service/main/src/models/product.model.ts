import { Category } from '@/models/category.model';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '@/models/base_model.model';
import { Shop } from '@/models/shop.model';

@Entity('products')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false
  })
  name!: string;

  @Column({
    type: 'text',
    nullable: true
  })
  description?: string;

  @Column({
    type: 'integer',
    nullable: false
  })
  price!: number;

  @Column({
    type: 'integer',
    nullable: false
  })
  quantity!: number;

  @Column({
    type: 'text',
    array: true,
    nullable: true
  })
  picture?: string[];

  @Column({
    type: 'json',
    nullable: true
  })
  detail?: Record<string, string>;

  @Column({
    type: 'text',
    array: true,
    nullable: true
  })
  tags?: string[];

  @Column({ name: 'category_id' })
  categoryId!: string;

  @Column({ name: 'shop_id' })
  shopId!: string;

  @JoinColumn({ name: 'category_id' })
  @ManyToOne(() => Category, (category) => category.products)
  category!: Category;

  @JoinColumn({ name: 'shop_id' })
  @ManyToOne(() => Shop, (shop) => shop.products)
  shop!: Shop;
}
