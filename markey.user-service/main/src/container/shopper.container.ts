import { ShopperController } from '@/controller/shopper.controller';
import { ShopperService } from '@/service/shopper.service';
import { Shopper } from '@/models/shopper.model';
import { ShopperRepository } from '@/repository/shopper.repository';
import { IShopperService } from '@/service/interface/i.shopper.service';
import { IShopperRepository } from '@/repository/interface/i.shopper.repository';
import { BaseContainer } from '@/container/base.container';
import { IRoleRepository } from '@/repository/interface/i.role.repository';
import { roleRepository } from '@/container/role.container';
import { IShoppingCartRepository } from '@/repository/interface/i.shopping_cart.repository';
import { shoppingCartRepository } from '@/container/shopping_cart.container';

class ShopperContainer extends BaseContainer {
  constructor() {
    super(Shopper);
    this.container.bind<IShopperService<Shopper>>('ShopperService').to(ShopperService);
    this.container.bind<IShopperRepository<Shopper>>('ShopperRepository').to(ShopperRepository);
    this.container.bind<ShopperController>(ShopperController).toSelf();

    //Import
    this.container.bind<IRoleRepository<any>>('RoleRepository').toConstantValue(roleRepository);
    this.container.bind<IShoppingCartRepository>('ShoppingCartRepository').toConstantValue(shoppingCartRepository);
  }

  export() {
    const shopperController = this.container.get<ShopperController>(ShopperController);
    const shopperService = this.container.get<IShopperService<any>>('ShopperService');
    const shopperRepository = this.container.get<IShopperRepository<any>>('ShopperRepository');
    return { shopperController, shopperService, shopperRepository };
  }
}

const shopperContainer = new ShopperContainer();
const { shopperController, shopperService, shopperRepository } = shopperContainer.export();
export { shopperController, shopperService, shopperRepository };
