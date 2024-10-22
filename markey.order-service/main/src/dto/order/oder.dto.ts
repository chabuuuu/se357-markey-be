import { Expose } from 'class-transformer';

export class OrderDto {
  @Expose()
  id!: string;

  @Expose()
  total!: number;

  @Expose()
  address!: string;

  @Expose()
  shopperId!: string;
}
