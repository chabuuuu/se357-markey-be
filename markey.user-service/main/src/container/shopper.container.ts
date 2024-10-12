import { ShopperController } from '@/controller/shopper.controller';
import { ShopperService } from '@/service/shopper.service';
import { Shopper } from '@/models/shopper.model';
import { ShopperRepository } from '@/repository/shopper.repository';
import { IShopperService } from '@/service/interface/i.shopper.service';
import { IShopperRepository } from '@/repository/interface/i.shopper.repository';
import { BaseContainer } from '@/container/base.container';
import { IRoleRepository } from '@/repository/interface/i.role.repository';
import { roleRepository } from '@/container/role.container';

class ShopperContainer extends BaseContainer {
  constructor() {
    super(Shopper);
    this.container.bind<IShopperService<Shopper>>('ShopperService').to(ShopperService);
    this.container.bind<IShopperRepository<Shopper>>('ShopperRepository').to(ShopperRepository);
    this.container.bind<ShopperController>(ShopperController).toSelf();

    //Import
    this.container.bind<IRoleRepository<any>>('RoleRepository').toConstantValue(roleRepository);
  }

  export() {
    const shopperController = this.container.get<ShopperController>(ShopperController);
    const shopperService = this.container.get<IShopperService<any>>('ShopperService');
    return { shopperController, shopperService };
  }
}

const shopperContainer = new ShopperContainer();
const { shopperController, shopperService } = shopperContainer.export();
export { shopperController, shopperService };
