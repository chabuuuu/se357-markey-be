import { BaseEntity } from '@/models/base-model.model';
import { CartItem } from '@/models/cart_item.model';
import { Shopper } from '@/models/shopper.model';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('shopping_carts')
export class ShoppingCart extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    name: 'shopper_id'
  })
  shopperId!: string;

  // @OneToOne(() => Shopper, (shopper) => shopper.shoppingCart)
  // @JoinColumn({ name: 'shopper_id' })
  // shopper!: Shopper;

  @OneToMany(() => CartItem, (cart_item) => cart_item.shoppingCart)
  cartItems!: CartItem[];
}
