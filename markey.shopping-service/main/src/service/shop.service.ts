import { Shop } from '@/models/shop.model';
import { IShopRepository } from '@/repository/interface/i.shop.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IShopService } from '@/service/interface/i.shop.service';
import { inject, injectable } from 'inversify';

@injectable()
export class ShopService extends BaseCrudService<Shop> implements IShopService<Shop> {
private shopRepository: IShopRepository<Shop>;

constructor(@inject('ShopRepository') shopRepository: IShopRepository<Shop>) {
super(shopRepository);
this.shopRepository = shopRepository;
}
}