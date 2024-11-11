import { Product } from '@/models/product.model';
import { Index } from 'lunr';

export interface ISearchService {
  deleteProductIndex(): Promise<void>;
  saveProductIndex(products: Product[]): Promise<void>;
  loadProductIndex(): Promise<Index | null>;
}
