import { IProduct } from '@/models/product.model';
import { IProductRepository } from '@/repository/interface/i.product.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IProductService } from '@/service/interface/i.product.service';
import { inject, injectable } from 'inversify';

@injectable()
export class ProductService extends BaseCrudService<IProduct> implements IProductService<IProduct> {
private productRepository: IProductRepository<IProduct>;

constructor(@inject('ProductRepository') productRepository: IProductRepository<IProduct>) {
super(productRepository);
this.productRepository = productRepository;
}
}