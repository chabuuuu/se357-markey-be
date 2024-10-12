import { BaseEntity } from '@/models/base-model.model';
import { ShoppingCart } from '@/models/shopping-cart.model';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('cart_items')
export class CartItem extends BaseEntity {
  @PrimaryColumn({ name: 'shopping_cart_id' })
  shoppingCartId!: string;

  @PrimaryColumn({ name: 'product_id' })
  productId!: string;

  @Column({
    type: 'integer',
    nullable: false,
    default: 1
  })
  amount!: number;

  @ManyToOne(() => ShoppingCart, (shopping_cart) => shopping_cart.cartItems)
  @JoinColumn({ name: 'shopping_cart_id' })
  shoppingCart!: ShoppingCart;
}
