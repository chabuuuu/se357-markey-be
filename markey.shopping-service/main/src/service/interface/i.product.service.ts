import { PagingResponseDto } from '@/dto/paging-response.dto';
import { PagingDto } from '@/dto/paging.dto';
import { CreateProductReq } from '@/dto/product/create-product.req';
import { FindProductReq } from '@/dto/product/find-product.req';
import { Product } from '@/models/product.model';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface IProductService<T extends BaseModelType> extends IBaseCrudService<T> {
  findWithFilter(filter: FindProductReq, paging: PagingDto): Promise<PagingResponseDto<Product>>;
  createWithSalesmanId(data: CreateProductReq, salesmanId: string): Promise<Product>;
}
