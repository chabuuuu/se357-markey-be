import { ShopRepository } from '@/repository/shop.repository';
import { IShopRepository } from '@/repository/interface/i.shop.repository';
import { Container } from 'inversify';

class ShopContainer {
  private container = new Container();
  constructor() {
    this.container.bind<IShopRepository>('ShopRepository').to(ShopRepository);
  }

  export() {
    const shopRepository = this.container.get<IShopRepository>('ShopRepository');
    return { shopRepository };
  }
}

const shopContainer = new ShopContainer();
const { shopRepository } = shopContainer.export();
export { shopRepository };
