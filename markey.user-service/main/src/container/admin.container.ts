import { AdminController } from '@/controller/admin.controller';
import { AdminService } from '@/service/admin.service';
import { Admin } from '@/models/admin.model';
import { AdminRepository } from '@/repository/admin.repository';
import { IAdminService } from '@/service/interface/i.admin.service';
import { IAdminRepository } from '@/repository/interface/i.admin.repository';
import { BaseContainer } from '@/container/base.container';
import { IRoleRepository } from '@/repository/interface/i.role.repository';
import { RoleRepository } from '@/repository/role.repository';
import { roleRepository } from '@/container/role.container';
import { ISalesmanRepository } from '@/repository/interface/i.salesman.repository';
import { salesmanRepository } from '@/container/salesman.container';

class AdminContainer extends BaseContainer {
  constructor() {
    super(Admin);
    this.container.bind<IAdminService<Admin>>('AdminService').to(AdminService);
    this.container.bind<IAdminRepository<Admin>>('AdminRepository').to(AdminRepository);
    this.container.bind<AdminController>(AdminController).toSelf();

    //Import
    this.container.bind<IRoleRepository<any>>('RoleRepository').toConstantValue(roleRepository);
    this.container.bind<ISalesmanRepository<any>>('SalesmanRepository').toConstantValue(salesmanRepository);
  }

  export() {
    const adminController = this.container.get<AdminController>(AdminController);
    const adminService = this.container.get<IAdminService<any>>('AdminService');
    return { adminController, adminService };
  }
}

const adminContainer = new AdminContainer();
const { adminController, adminService } = adminContainer.export();
export { adminController, adminService };
