import { ShopController } from '@/controller/shop.controller';
import { ShopService } from '@/service/shop.service';
import { Shop } from '@/models/shop.model';
import { ShopRepository } from '@/repository/shop.repository';
import { IShopService } from '@/service/interface/i.shop.service';
import { IShopRepository } from '@/repository/interface/i.shop.repository';
import { BaseContainer } from '@/container/base.container';

class ShopContainer extends BaseContainer {
  constructor() {
    super(Shop);
    this.container.bind<IShopService<Shop>>('ShopService').to(ShopService);
    this.container.bind<IShopRepository<Shop>>('ShopRepository').to(ShopRepository);
    this.container.bind<ShopController>(ShopController).toSelf();
  }

  export() {
    const shopController = this.container.get<ShopController>(ShopController);
    const shopService = this.container.get<IShopService<any>>('ShopService');
    const shopRepository = this.container.get<IShopRepository<any>>('ShopRepository');
    return { shopController, shopService, shopRepository };
  }
}

const shopContainer = new ShopContainer();
const { shopController, shopService, shopRepository } = shopContainer.export();
export { shopController, shopService, shopRepository };
