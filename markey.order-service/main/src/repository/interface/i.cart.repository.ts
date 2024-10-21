import { GetCartRes } from '@/dto/shopping-service/get-cart.res';

export interface ICartRepository {
  findByShopperId(shopperId: string): Promise<GetCartRes>;
}
