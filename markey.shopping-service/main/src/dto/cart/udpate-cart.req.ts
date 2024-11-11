import { AddToCartReq } from '@/dto/cart/add-to-cart.req';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class UpdateCartReq {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddToCartReq)
  items!: AddToCartReq[];
}
