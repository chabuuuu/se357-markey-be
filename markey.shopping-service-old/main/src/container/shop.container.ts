import { ShopController } from '@/controller/shop.controller';
import { ShopService } from '@/service/shop.service';
import Shop, { IShop } from '@/models/shop.model';
import { ShopRepository } from '@/repository/shop.repository';
import { IShopService } from '@/service/interface/i.shop.service';
import { IShopRepository } from '@/repository/interface/i.shop.repository';
import { BaseContainer } from '@/container/base.container';

class ShopContainer extends BaseContainer {
  constructor() {
    super(Shop);
    this.container.bind<IShopService<IShop>>('ShopService').to(ShopService);
    this.container.bind<IShopRepository<IShop>>('ShopRepository').to(ShopRepository);
    this.container.bind<ShopController>(ShopController).toSelf();
  }

  export() {
    const shopController = this.container.get<ShopController>(ShopController);
    const shopService = this.container.get<IShopService<any>>('ShopService');
    return { shopController, shopService };
  }
}

const shopContainer = new ShopContainer();
const { shopController, shopService } = shopContainer.export();
export { shopController, shopService };
