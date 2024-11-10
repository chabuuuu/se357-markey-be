export class ProductInCartRes {
  id!: string;
  name!: string;
  description?: string;
  price!: number;
  picture?: string[];
  amount!: number;
  shopId!: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
}
