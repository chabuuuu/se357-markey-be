import { AddToCartReq } from '@/dto/cart/add-to-cart.req';
import { GetCartGroupByCreatedAt } from '@/dto/cart/get-cart-group-by-created-date.res';
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

  async getCartGroupByCreatedDate(shopperId: string): Promise<GetCartGroupByCreatedAt> {
    const groupByMap = new Map<Date, Array<ProductInCartRes>>();

    const cart = await this.shoppingCartRepository.findOne({
      filter: {
        shopperId: shopperId
      },
      relations: ['cartItems']
    });

    const result = new GetCartGroupByCreatedAt();
    if (!cart) {
      return result;
    }

    let total = 0;

    cart.cartItems.forEach((item) => {
      const productInCart = new ProductInCartRes();
      productInCart.id = item.productId;
      productInCart.amount = item.amount;
      productInCart.price = item.product.price;
      productInCart.description = item.product.description;
      productInCart.name = item.product.name;
      productInCart.picture = item.product.picture;
      productInCart.createdAt = item.createAt;
      productInCart.updatedAt = item.updateAt;
      productInCart.createdBy = item.createBy;
      productInCart.updatedBy = item.updateBy;

      const productInCarts = groupByMap.get(item.createAt) || [];

      productInCarts.push(productInCart);

      groupByMap.set(item.createAt, productInCarts);

      //Tính tổng tiền
      total += item.amount * item.product.price;
    });

    console.log('groupByMap', groupByMap);

    const groupByResponse: {
      addedAt: Date;
      products: ProductInCartRes[];
    }[] = [];

    groupByMap.forEach((value, key) => {
      groupByResponse.push({
        addedAt: key,
        products: value
      });
    });

    result.group = groupByResponse;
    result.total = total;
    result.shoppingCartId = cart.id;

    return result;
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
    let total = 0;

    cart.cartItems.forEach((item) => {
      const productInCart = new ProductInCartRes();
      productInCart.id = item.productId;
      productInCart.amount = item.amount;
      productInCart.price = item.product.price;
      productInCart.description = item.product.description;
      productInCart.name = item.product.name;
      productInCart.picture = item.product.picture;
      productInCart.createdAt = item.createAt;
      productInCart.updatedAt = item.updateAt;
      productInCart.createdBy = item.createBy;
      productInCart.updatedBy = item.updateBy;

      productInCarts.push(productInCart);

      //Tính tổng tiền
      total += item.amount * item.product.price;
    });

    result.products = productInCarts;
    result.total = total;

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

    console.log('cartItemWithSameProduct', cartItemWithSameProduct);

    //Nếu có sản phẩm trong giỏ hàng rồi thì cập nhật số lượng
    if (cartItemWithSameProduct) {
      //Nếu user truyền vào amount là 0 => xóa sản phẩm khỏi giỏ hàng
      if (data.amount === 0) {
        await this.cartItemRepository.findOneAndHardDelete({
          filter: {
            shoppingCartId: cart.id,
            productId: data.productId
          }
        });

        return;
      }

      await this.cartItemRepository.findOneAndUpdate({
        filter: {
          shoppingCartId: cart.id,
          productId: data.productId
        },
        updateData: {
          amount: data.amount
        }
      });

      return;
    }

    //Nếu không thì sẽ thêm mới

    //Add to cartItem
    const newCartItem = new CartItem();
    newCartItem.shoppingCartId = cart.id;
    newCartItem.productId = data.productId;
    newCartItem.amount = data.amount;

    await this.cartItemRepository.create({
      data: newCartItem
    });

    console.log('cart', cart);

    return;
  }
}
