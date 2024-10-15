import { CreateProductReq } from '@/dto/product/create-product.req';
import { Product } from '@/models/product.model';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface IProductService<T extends BaseModelType> extends IBaseCrudService<T> {
  createWithSalesmanId(data: CreateProductReq, salesmanId: string): Promise<Product>;
}
