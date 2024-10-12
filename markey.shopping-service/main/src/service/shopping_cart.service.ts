import { AddToCartReq } from '@/dto/cart/add-to-cart.req';
import { GetCartRes } from '@/dto/cart/get-cart.res';
import { ProductInCartRes } from '@/dto/product/product-in-cart.res';
import { ErrorCode } from '@/enums/error-code.enums';
import { ICartItem } from '@/models/cart_item.model';
import { IShoppingCart } from '@/models/shopping_cart.model';
import { ICartItemRepository } from '@/repository/interface/i.cart_item.repository';
import { IShoppingCartRepository } from '@/repository/interface/i.shopping_cart.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IShoppingCartService } from '@/service/interface/i.shopping_cart.service';
import BaseError from '@/utils/error/base.error';
import { inject, injectable } from 'inversify';
import { ObjectId } from 'mongodb';

@injectable()
export class ShoppingCartService extends BaseCrudService<IShoppingCart> implements IShoppingCartService<IShoppingCart> {
  private shoppingCartRepository: IShoppingCartRepository<IShoppingCart>;
  private cartItemRepository: ICartItemRepository<ICartItem>;

  constructor(
    @inject('ShoppingCartRepository') shoppingCartRepository: IShoppingCartRepository<IShoppingCart>,
    @inject('CartItemRepository') cartItemRepository: ICartItemRepository<ICartItem>
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
      select: ['id']
    });

    if (!cart) {
      throw new BaseError(ErrorCode.GENERAL, 'Cart of this user not exists');
    }

    console.log('cart', cart);

    const cartItems = await this.cartItemRepository.findMany({
      filter: {
        shoppingCartId: cart.id
      }
    });

    console.log('cartItem', cartItems);

    if (cartItems.length === 0) {
      return {
        shoppingCartId: cart.id,
        products: []
      };
    }

    const products = new Array<ProductInCartRes>();

    cartItems.forEach(async (item) => {
      const cartItem = await this.cartItemRepository.findOne({
        filter: {
          id: item.id
        },
        relations: ['Product']
      });
      const product = cartItem?.product;
      products.push({
        id: product!.id,
        name: product!.name,
        price: product!.price,
        amount: item.amount,
        description: product!.description,
        picture: product!.picture
      });
    });

    return {
      shoppingCartId: cart.id,
      products: products
    };
  }

  async addToCart(shopperId: string, data: AddToCartReq): Promise<void> {
    const cart = await this.shoppingCartRepository.findOne({
      filter: {
        shopperId: shopperId
      }
    });

    if (!cart) {
      throw new BaseError(ErrorCode.GENERAL, 'Cart of this user not exists');
    }

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

    await this.cartItemRepository.create({
      data: {
        shoppingCartId: cart.id,
        productId: data.productId,
        amount: data.amount
      }
    });
    return;
  }
}
