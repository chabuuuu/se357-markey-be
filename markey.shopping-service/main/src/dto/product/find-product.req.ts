import { ProductSortEnum } from '@/enums/product-sort.enum';
import { IsEnum } from 'class-validator';

export class FindProductReq {
  sort!: {
    by: string;
    order: 'ASC' | 'DESC';
  };

  name?: string;

  priceFrom?: number;

  priceTo?: number;

  aboveRating?: number;

  categoryId?: string;
}
