import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { SalesmanDetailRes } from '@/dto/salesman/salesman-detail.res';
import { SalesmanLoginReq } from '@/dto/salesman/salesman-login.req';
import { SalesmanLoginRes } from '@/dto/salesman/salesman-login.res';
import { SalesmanRegisterReq } from '@/dto/salesman/salesman-register.req';
import { SalesmanUpdateReq } from '@/dto/salesman/salesman-update.req';
import { ErrorCode } from '@/enums/error-code.enums';
import { Salesman } from '@/models/salesman.model';
import { Shop } from '@/models/shop.model';
import { ISalesmanService } from '@/service/interface/i.salesman.service';
import { IShopService } from '@/service/interface/i.shop.service';
import { ITYPES } from '@/types/interface.types';
import { convertToDto } from '@/utils/dto-convert/convert-to-dto.util';
import BaseError from '@/utils/error/base.error';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class SalesmanController {
  public common: IBaseCrudController<Salesman>;
  private salesmanService: ISalesmanService<Salesman>;
  private shopService: IShopService<Shop>;
  constructor(
    @inject('SalesmanService') salesmanService: ISalesmanService<Salesman>,
    @inject(ITYPES.Controller) common: IBaseCrudController<Salesman>,
    @inject('ShopService') shopService: IShopService<Shop>
  ) {
    this.salesmanService = salesmanService;
    this.common = common;
    this.shopService = shopService;
  }

  /**
   * * POST /api/salesman/register
   */
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data: SalesmanRegisterReq = req.body;
      const result = await this.salesmanService.register(data);
      res.send_ok('Register success, waiting for activate phone number', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /api/salesman/activation/phone/?phoneNumber=xxx&code=xxx
   */
  async activatePhoneNumber(
    req: Request<null, null, null, { phoneNumber: string; code: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      let phoneNumber = req.query.phoneNumber;
      const code = req.query.code;

      if (!phoneNumber || !code) {
        res.send_badRequest('Phone number and code are required');
      }

      phoneNumber = '+' + phoneNumber;

      await this.salesmanService.activatePhoneNumber(phoneNumber, code);
      res.send_ok('Activate phone number success');
    } catch (error: any) {
      if (error instanceof BaseError) {
        if (error.code === ErrorCode.PHONE_NUMBER_NOT_FOUND) {
          res.send_notFound('Phone number not found', error);
        }
        if (error.code === ErrorCode.INVALID_CODE) {
          res.send_badRequest(error.message, error);
        }
        next(error);
      }
    }
  }

  /**
   * * PUT /api/salesman/approve/:salesmanId
   */
  async approve(req: Request, res: Response, next: NextFunction) {
    try {
      const salesmanId = req.params.salesmanId;
      await this.salesmanService.approve(salesmanId);
      res.send_ok('Approve success');
    } catch (error) {
      if (error instanceof BaseError) {
        if (error.code === ErrorCode.ENTITY_NOT_FOUND) {
          res.send_notFound(error.msg, error);
        }
        next(error);
      }
    }
  }

  /**
   * * GET /api/salesmans/:salesmanId
   */
  async findOneById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.salesmanId;
      const result = await this.salesmanService.findOne({
        filter: {
          id: id
        },
        relations: ['shop']
      });
      const resultDto = convertToDto(SalesmanDetailRes, result);
      res.send_ok('Get success', resultDto);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * DELETE /api/salesmans/:salesmanId
   */
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.salesmanId;
      await this.salesmanService.deleteBySalesmanId(id);
      res.send_ok('Delete success');
    } catch (error) {
      next(error);
    }
  }

  /**
   * * POST /api/salesman/activation/email
   */
  async activateEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const salesmanId = req.user?.id;
      if (!salesmanId) {
        throw new BaseError(ErrorCode.AUTH_01, 'Unauthorized');
      }
      if (!email) {
        res.send_badRequest('Email is required', new BaseError(ErrorCode.VALIDATION_ERROR, 'Email is required'));
      }
      await this.salesmanService.activateEmail(salesmanId!, email);
      res.send_ok('Activate email success');
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /api/salesman/verify-email-token/?email=xxx&token=xxx
   */
  async verifyEmailToken(
    req: Request<null, null, null, { email: string; token: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const email = req.query.email;
      const token = req.query.token;
      if (!email || !token) {
        res.send_badRequest('Email and token are required');
      }
      await this.salesmanService.verifyEmailToken(email, token);
      res.send_ok('Verify email token success');
    } catch (error) {
      next(error);
    }
  }

  /**
   * * POST /api/salesman/login
   */
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data: SalesmanLoginReq = req.body;
      const result: SalesmanLoginRes = await this.salesmanService.login(data);
      res.send_ok('Login success', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /api/salesman/me
   */
  async getMeDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.salesmanService.findOne({
        filter: {
          id: req.user?.id
        }
      });
      const resultDto = convertToDto(SalesmanDetailRes, result);
      res.send_ok('Get me success', resultDto);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * PUT /api/salesman/:salesmanId
   */
  async updateBySalesmanId(req: Request, res: Response, next: NextFunction) {
    try {
      const salesmanId = req.params.salesmanId;
      const data: SalesmanUpdateReq = req.body;
      const result = await this.salesmanService.findOneAndUpdate({
        filter: {
          id: salesmanId!
        },
        updateData: data
      });
      res.send_ok('Update success', result);
    } catch (error) {
      next(error);
    }
  }
}
