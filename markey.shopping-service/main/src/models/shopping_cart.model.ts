import { CartItem } from '@/models/cart_item.model';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('shopping_carts')
export class ShoppingCart {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    name: 'shopper_id'
  })
  shopperId!: string;

  @OneToMany(() => CartItem, (cart_item) => cart_item.shoppingCart)
  cartItems!: CartItem[];
}
