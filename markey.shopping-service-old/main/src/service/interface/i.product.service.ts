import { CreateProductReq } from '@/dto/product/create-product.req';
import { IProduct } from '@/models/product.model';
import { IBaseCrudService } from '@/service/interface/i.base.service';

export interface IProductService<T> extends IBaseCrudService<T> {
  createProduct(data: CreateProductReq): Promise<IProduct>;
}
