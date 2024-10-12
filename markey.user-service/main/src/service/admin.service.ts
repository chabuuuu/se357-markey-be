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

@injectable()
export class AdminService extends BaseCrudService<Admin> implements IAdminService<Admin> {
  private adminRepository: IAdminRepository<Admin>;
  private roleRepository: IRoleRepository<Role>;

  constructor(
    @inject('AdminRepository') adminRepository: IAdminRepository<Admin>,
    @inject('RoleRepository') roleRepository: IRoleRepository<Role>
  ) {
    super(adminRepository);
    this.adminRepository = adminRepository;
    this.roleRepository = roleRepository;
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

    if (!bcrypt.compareSync(password, admin.password)) {
      throw new BaseError(ErrorCode.AUTH_01, 'Password is incorrect');
    }

    const adminRole = await this.roleRepository.findOne({
      filter: {
        name: RoleNameEnum.admin
      }
    });

    const adminPermissions = await adminRole?.permissions;

    const adminPermissionCodes = adminPermissions!.map((permission) => permission.code) || [''];

    const jwtClaim = new JwtClaimDto(admin.id, admin.username, adminPermissionCodes, adminRole!.name);

    const secretKey = process.env.LOGIN_SECRET_KEY || '';

    const token = jwt.sign(_.toPlainObject(jwtClaim), secretKey, { expiresIn: TIME_CONSTANTS.DAY * 3 });

    return new AdminLoginRes(token);
  }
}
