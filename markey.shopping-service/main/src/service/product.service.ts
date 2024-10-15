import { CreateProductReq } from '@/dto/product/create-product.req';
import { ErrorCode } from '@/enums/error-code.enums';
import { Product } from '@/models/product.model';
import { Shop } from '@/models/shop.model';
import { IProductRepository } from '@/repository/interface/i.product.repository';
import { IShopRepository } from '@/repository/interface/i.shop.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IProductService } from '@/service/interface/i.product.service';
import BaseError from '@/utils/error/base.error';
import { inject, injectable } from 'inversify';

@injectable()
export class ProductService extends BaseCrudService<Product> implements IProductService<Product> {
  private productRepository: IProductRepository<Product>;
  private shopRepository: IShopRepository<Shop>;

  constructor(
    @inject('ProductRepository') productRepository: IProductRepository<Product>,
    @inject('ShopRepository') shopRepository: IShopRepository<Shop>
  ) {
    super(productRepository);
    this.productRepository = productRepository;
    this.shopRepository = shopRepository;
  }

  async createWithSalesmanId(data: CreateProductReq, salesmanId: string): Promise<Product> {
    const shop = await this.shopRepository.findOne({
      filter: {
        salesmanId: salesmanId
      }
    });
    if (!shop) {
      throw new BaseError(ErrorCode.NF_01, 'Shop not found with given salesmanId: ' + salesmanId);
    }
    const product = await this.productRepository.create({
      data: {
        ...data,
        shopId: shop.id
      }
    });
    return product;
  }
}
