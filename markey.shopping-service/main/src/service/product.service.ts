import { Product } from '@/models/product.model';
import { IProductRepository } from '@/repository/interface/i.product.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IProductService } from '@/service/interface/i.product.service';
import { inject, injectable } from 'inversify';

@injectable()
export class ProductService extends BaseCrudService<Product> implements IProductService<Product> {
private productRepository: IProductRepository<Product>;

constructor(@inject('ProductRepository') productRepository: IProductRepository<Product>) {
super(productRepository);
this.productRepository = productRepository;
}
}