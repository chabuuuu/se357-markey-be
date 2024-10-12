import { SalesmanController } from '@/controller/salesman.controller';
import { SalesmanService } from '@/service/salesman.service';
import { Salesman } from '@/models/salesman.model';
import { SalesmanRepository } from '@/repository/salesman.repository';
import { ISalesmanService } from '@/service/interface/i.salesman.service';
import { ISalesmanRepository } from '@/repository/interface/i.salesman.repository';
import { BaseContainer } from '@/container/base.container';
import { IShopRepository } from '@/repository/interface/i.shop.repository';
import { shopRepository, shopService } from '@/container/shop.container';
import { IShopService } from '@/service/interface/i.shop.service';
import { IRoleRepository } from '@/repository/interface/i.role.repository';
import { roleRepository } from '@/container/role.container';

class SalesmanContainer extends BaseContainer {
  constructor() {
    super(Salesman);
    this.container.bind<ISalesmanService<Salesman>>('SalesmanService').to(SalesmanService);
    this.container.bind<ISalesmanRepository<Salesman>>('SalesmanRepository').to(SalesmanRepository);
    this.container.bind<SalesmanController>(SalesmanController).toSelf();
    this.container.bind<IShopRepository<any>>('ShopRepository').toConstantValue(shopRepository);
    this.container.bind<IShopService<any>>('ShopService').toConstantValue(shopService);
    this.container.bind<IRoleRepository<any>>('RoleRepository').toConstantValue(roleRepository);
  }

  export() {
    const salesmanController = this.container.get<SalesmanController>(SalesmanController);
    const salesmanService = this.container.get<ISalesmanService<any>>('SalesmanService');
    return { salesmanController, salesmanService };
  }
}

const salesmanContainer = new SalesmanContainer();
const { salesmanController, salesmanService } = salesmanContainer.export();
export { salesmanController, salesmanService };
