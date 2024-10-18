import { AddToCartReq } from '@/dto/cart/add-to-cart.req';
import { GetCartRes } from '@/dto/cart/get-cart.res';
import { ProductInCartRes } from '@/dto/product/product-in-cart.res';
import { CartItem } from '@/models/cart_item.model';
import { ShoppingCart } from '@/models/shopping_cart.model';
import { IShoppingCartRepository } from '@/repository/interface/i.shopping_cart.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IShoppingCartService } from '@/service/interface/i.shopping_cart.service';
import { inject, injectable } from 'inversify';

@injectable()
export class ShoppingCartService extends BaseCrudService<ShoppingCart> implements IShoppingCartService<ShoppingCart> {
  private shoppingCartRepository: IShoppingCartRepository<ShoppingCart>;
  private cartItemRepository: IShoppingCartRepository<CartItem>;

  constructor(
    @inject('ShoppingCartRepository') shoppingCartRepository: IShoppingCartRepository<ShoppingCart>,
    @inject('CartItemRepository') cartItemRepository: IShoppingCartRepository<CartItem>
  ) {
    super(shoppingCartRepository);
    this.shoppingCartRepository = shoppingCartRepository;
    this.cartItemRepository = cartItemRepository;
  }

  async getCart(shopperId: string): Promise<GetCartRes> {
    const cart = await this.shoppingCartRepository.findOne({
      filter: {
        shopperId: shopperId
      },
      relations: ['cartItems']
    });

    const result = new GetCartRes();
    if (!cart) {
      return result;
    }
    result.shoppingCartId = cart.id;
    const productInCarts = new Array<ProductInCartRes>();
    cart.cartItems.forEach((item) => {
      const productInCart = new ProductInCartRes();
      productInCart.id = item.productId;
      productInCart.amount = item.amount;
      productInCart.price = item.product.price;
      productInCart.description = item.product.description;
      productInCart.name = item.product.name;
      productInCart.picture = item.product.picture;

      productInCarts.push(productInCart);
    });

    result.products = productInCarts;

    return result;
  }

  async addToCart(shopperId: string, data: AddToCartReq): Promise<void> {
    const cart = await this.shoppingCartRepository.findOne({
      filter: {
        shopperId: shopperId
      },
      relations: ['cartItems']
    });

    if (!cart) {
      throw new Error('Cart not found');
    }

    console.log('cart', cart);

    const cartItemWithSameProduct = await this.cartItemRepository.findOne({
      filter: {
        shoppingCartId: cart.id,
        productId: data.productId
      }
    });

    //Nếu có sản phẩm trong giỏ hàng rồi thì cập nhật số lượng
    if (cartItemWithSameProduct) {
      await this.cartItemRepository.findOneAndUpdate({
        filter: {
          shoppingCartId: cart.id,
          productId: data.productId
        },
        updateData: {
          amount: cartItemWithSameProduct.amount + data.amount
        }
      });

      return;
    }

    //Nếu không thì sẽ thêm mới

    //Add to cartItem
    const newCartItem = new CartItem();
    newCartItem.productId = data.productId;
    newCartItem.amount = data.amount;

    cart.cartItems.push(newCartItem);

    console.log('cart', cart);

    await this.shoppingCartRepository.save(cart);

    return;
  }
}
