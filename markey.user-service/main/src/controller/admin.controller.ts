import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { AdminDetailRes } from '@/dto/admin/admin-detail.res';
import { AdminLoginReq } from '@/dto/admin/admin-login.req';
import { Admin } from '@/models/admin.model';
import { IAdminService } from '@/service/interface/i.admin.service';
import { ITYPES } from '@/types/interface.types';
import { convertToDto } from '@/utils/dto-convert/convert-to-dto.util';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class AdminController {
  public common: IBaseCrudController<Admin>;
  private adminService: IAdminService<Admin>;
  constructor(
    @inject('AdminService') adminService: IAdminService<Admin>,
    @inject(ITYPES.Controller) common: IBaseCrudController<Admin>
  ) {
    this.adminService = adminService;
    this.common = common;
  }

  /**
   ** GET /api/admin
   */
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.adminService.findAll();
      console.log(result);

      const resultDto = result.map((item) => {
        return convertToDto(AdminDetailRes, item);
      });
      res.send_ok('Get all success', resultDto);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * POST /api/admin/login
   */
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data: AdminLoginReq = req.body;
      const result = await this.adminService.login(data);
      res.send_ok('Login success', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   ** GET /api/admin/me
   */
  async getMeDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.adminService.findOne({
        filter: {
          id: req.user?.id
        }
      });
      const resultDto = convertToDto(AdminDetailRes, result);
      res.send_ok('Get me success', resultDto);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * PUT /admin/approve-salesman/:salesmanId
   */
  async approveSalesman(req: Request, res: Response, next: NextFunction) {
    try {
      const salesmanId = req.params.salesmanId;
      await this.adminService.approveSalesman(salesmanId);
      res.send_ok('Approve salesman success');
    } catch (error) {
      next(error);
    }
  }
}
