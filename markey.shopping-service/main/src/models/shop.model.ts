import { Product } from '@/models/product.model';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique
} from 'typeorm';

@Entity('shops')
@Unique(['name'])
export class Shop extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    length: 70,
    nullable: false
  })
  name!: string;

  @Column({
    type: 'text',
    nullable: true,
    name: 'profile_picture'
  })
  profilePicture?: string;

  @Column({
    type: 'text',
    nullable: true
  })
  description?: string;

  @Column({
    name: 'salesman_id'
  })
  salesmanId!: string;

  @OneToMany(() => Product, (product) => product.shop)
  products!: Promise<Product[]>;
}
