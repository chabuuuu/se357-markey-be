import { BaseRes } from '@/dto/base.res';

export class ProductInCartRes {
  id!: string;
  name!: string;
  description!: string;
  price!: number;
  picture!: string;
  amount!: number;
}
