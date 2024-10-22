import { SalesmanController } from '@/controller/salesman.controller';
import { SalesmanService } from '@/service/salesman.service';
import { Salesman } from '@/models/salesman.model';
import { SalesmanRepository } from '@/repository/salesman.repository';
import { ISalesmanService } from '@/service/interface/i.salesman.service';
import { ISalesmanRepository } from '@/repository/interface/i.salesman.repository';
import { BaseContainer } from '@/container/base.container';
import { IShopRepository } from '@/repository/interface/i.shop.repository';
import { IRoleRepository } from '@/repository/interface/i.role.repository';
import { roleRepository } from '@/container/role.container';
import { shopRepository } from '@/container/shop.container';

class SalesmanContainer extends BaseContainer {
  constructor() {
    super(Salesman);
    this.container.bind<ISalesmanService<Salesman>>('SalesmanService').to(SalesmanService);
    this.container.bind<ISalesmanRepository<Salesman>>('SalesmanRepository').to(SalesmanRepository);
    this.container.bind<SalesmanController>(SalesmanController).toSelf();

    this.container.bind<IRoleRepository<any>>('RoleRepository').toConstantValue(roleRepository);
    this.container.bind<IShopRepository>('ShopRepository').toConstantValue(shopRepository);
  }

  export() {
    const salesmanController = this.container.get<SalesmanController>(SalesmanController);
    const salesmanService = this.container.get<ISalesmanService<any>>('SalesmanService');
    const salesmanRepository = this.container.get<ISalesmanRepository<any>>('SalesmanRepository');
    return { salesmanController, salesmanService, salesmanRepository };
  }
}

const salesmanContainer = new SalesmanContainer();
const { salesmanController, salesmanService, salesmanRepository } = salesmanContainer.export();
export { salesmanController, salesmanService, salesmanRepository };
