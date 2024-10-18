import { Product } from '@/models/product.model';
import { ShoppingCart } from '@/models/shopping_cart.model';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('cart_items')
export class CartItem {
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

  @JoinColumn({ name: 'shopping_cart_id' })
  @ManyToOne(() => ShoppingCart, (shoppingCart) => shoppingCart.cartItems)
  shoppingCart!: ShoppingCart;

  @JoinColumn({ name: 'product_id' })
  @ManyToOne(() => Product, {
    eager: true
  })
  product!: Product;
}
