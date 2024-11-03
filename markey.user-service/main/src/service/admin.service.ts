import { TIME_CONSTANTS } from '@/constants/time.constants';
import { AdminLoginReq } from '@/dto/admin/admin-login.req';
import { AdminLoginRes } from '@/dto/admin/admin-login.res';
import { JwtClaimDto } from '@/dto/jwt-claim.dto';
import { ErrorCode } from '@/enums/error-code.enums';
import { RoleNameEnum } from '@/enums/role-name.enum';
import { Admin } from '@/models/admin.model';
import { Role } from '@/models/role.model';
import { IAdminRepository } from '@/repository/interface/i.admin.repository';
import { IRoleRepository } from '@/repository/interface/i.role.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IAdminService } from '@/service/interface/i.admin.service';
import BaseError from '@/utils/error/base.error';
import { inject, injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import bcrypt from 'bcrypt';
import { ISalesmanRepository } from '@/repository/interface/i.salesman.repository';
import { Salesman } from '@/models/salesman.model';
import { IShopperRepository } from '@/repository/interface/i.shopper.repository';
import { Shopper } from '@/models/shopper.model';

@injectable()
export class AdminService extends BaseCrudService<Admin> implements IAdminService<Admin> {
  private adminRepository: IAdminRepository<Admin>;
  private roleRepository: IRoleRepository<Role>;
  private salesmanRepository: ISalesmanRepository<Salesman>;
  private shopperRepository: IShopperRepository<Shopper>;

  constructor(
    @inject('AdminRepository') adminRepository: IAdminRepository<Admin>,
    @inject('RoleRepository') roleRepository: IRoleRepository<Role>,
    @inject('SalesmanRepository') salesmanRepository: ISalesmanRepository<Salesman>,
    @inject('ShopperRepository') shopperRepository: IShopperRepository<Shopper>
  ) {
    super(adminRepository);
    this.adminRepository = adminRepository;
    this.roleRepository = roleRepository;
    this.salesmanRepository = salesmanRepository;
    this.shopperRepository = shopperRepository;
  }
  async unBlockShopper(shopperId: string): Promise<void> {
    const shopper = await this.shopperRepository.findOne({
      filter: {
        id: shopperId
      }
    });
    if (!shopper) {
      throw new BaseError(ErrorCode.NF_01, 'Shopper not found');
    }
    await this.shopperRepository.findOneAndUpdate({
      filter: { id: shopperId },
      updateData: {
        isBlocked: false
      }
    });

    return;
  }
  async unblockSalesman(salesmanId: string): Promise<void> {
    const salesman = await this.salesmanRepository.findOne({
      filter: {
        id: salesmanId
      }
    });
    if (!salesman) {
      throw new BaseError(ErrorCode.NF_01, 'Salesman not found');
    }
    await this.salesmanRepository.findOneAndUpdate({
      filter: { id: salesmanId },
      updateData: {
        isBlocked: true
      }
    });

    return;
  }
  /**
   * Block shopper now can't login
   * @param shopperId
   */
  async blockShopper(shopperId: string): Promise<void> {
    const shopper = await this.shopperRepository.findOne({
      filter: {
        id: shopperId
      }
    });
    if (!shopper) {
      throw new BaseError(ErrorCode.NF_01, 'Shopper not found');
    }
    await this.shopperRepository.findOneAndUpdate({
      filter: { id: shopperId },
      updateData: {
        isBlocked: true
      }
    });

    return;
  }

  /**
   * Block salesman now can't login
   * @param salesmanId
   */ async blockSalesman(salesmanId: string): Promise<void> {
    const salesman = await this.salesmanRepository.findOne({
      filter: {
        id: salesmanId
      }
    });
    if (!salesman) {
      throw new BaseError(ErrorCode.NF_01, 'Salesman not found');
    }
    await this.salesmanRepository.findOneAndUpdate({
      filter: { id: salesmanId },
      updateData: {
        isBlocked: true
      }
    });

    return;
  }

  /**
   * * Approve for salesman now can login
   * @param salesmanId
   */
  async approveSalesman(salesmanId: string): Promise<void> {
    const salesman = await this.salesmanRepository.findOne({
      filter: {
        id: salesmanId
      }
    });
    if (!salesman) {
      throw new BaseError(ErrorCode.NF_01, 'Salesman not found');
    }
    await this.salesmanRepository.findOneAndUpdate({
      filter: { id: salesmanId },
      updateData: {
        isApproved: true
      }
    });

    return;
  }

  /**
   * * Login to admin
   * @param data
   */
  async login(data: AdminLoginReq): Promise<AdminLoginRes> {
    const { username, password } = data;
    const admin = await this.adminRepository.findOne({
      filter: { username }
    });

    if (!admin) {
      throw new BaseError(ErrorCode.NF_01, 'Admin not found');
    }

    console.log('admin', admin);

    if (!bcrypt.compareSync(password, admin.password)) {
      throw new BaseError(ErrorCode.AUTH_01, 'Password is incorrect');
    }

    console.log('Password is correct');

    const adminRole = await this.roleRepository.findOne({
      filter: {
        name: RoleNameEnum.admin
      }
    });

    console.log('adminRole', adminRole);

    const adminPermissions = await adminRole?.permissions;

    const adminPermissionCodes = adminPermissions!.map((permission) => permission.code) || [''];

    const jwtClaim = new JwtClaimDto(admin.id, admin.username, adminPermissionCodes, adminRole!.name);

    const secretKey = process.env.LOGIN_SECRET_KEY || '';

    const token = jwt.sign(_.toPlainObject(jwtClaim), secretKey, { expiresIn: TIME_CONSTANTS.DAY * 3 });

    console.log('token', token);

    return new AdminLoginRes(token);
  }
}
