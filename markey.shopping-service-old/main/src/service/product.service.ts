import { CreateProductReq } from '@/dto/product/create-product.req';
import Category from '@/models/category.model';
import Product, { IProduct } from '@/models/product.model';
import { IProductRepository } from '@/repository/interface/i.product.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IProductService } from '@/service/interface/i.product.service';
import { inject, injectable } from 'inversify';
import { ObjectId } from 'mongodb';

@injectable()
export class ProductService extends BaseCrudService<IProduct> implements IProductService<IProduct> {
  private productRepository: IProductRepository<IProduct>;

  constructor(@inject('ProductRepository') productRepository: IProductRepository<IProduct>) {
    super(productRepository);
    this.productRepository = productRepository;
  }

  async createProduct(data: CreateProductReq): Promise<IProduct> {
    const product = new Product();
    product.name = data.name;
    product.price = data.price;
    product.description = data.description;
    product.price = data.price;
    product.picture = data.picture;
    product.detail = data.detail;
    product.quantity = data.quantity;
    product.tags = data.tags;
    const category = new Category();
    category._id = data.category.id;
    product.category = category;

    return await this.productRepository.create({
      data: product
    });
  }
}
