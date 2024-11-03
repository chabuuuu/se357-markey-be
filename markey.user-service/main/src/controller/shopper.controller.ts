import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { PagingDto } from '@/dto/paging.dto';
import { ShopperLoginReq } from '@/dto/shopper/shopper-login.req';
import { ShopperLoginRes } from '@/dto/shopper/shopper-login.res';
import { ShopperPagingRes } from '@/dto/shopper/shopper-paging.res';
import { ShopperRegisterReq } from '@/dto/shopper/shopper-register.req';
import { ShopperSearchReq } from '@/dto/shopper/shopper-search.req';
import { ShopperValidateRegisterReq } from '@/dto/shopper/shopper-valiate-registr.req';
import { ShopperRes } from '@/dto/shopper/shopper.res';
import { ErrorCode } from '@/enums/error-code.enums';
import { Shopper } from '@/models/shopper.model';
import { IShopperService } from '@/service/interface/i.shopper.service';
import { ITYPES } from '@/types/interface.types';
import { convertToDto } from '@/utils/dto-convert/convert-to-dto.util';
import BaseError from '@/utils/error/base.error';
import { plainToInstance } from 'class-transformer';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class ShopperController {
  public common: IBaseCrudController<Shopper>;
  private shopperService: IShopperService<Shopper>;
  constructor(
    @inject('ShopperService') shopperService: IShopperService<Shopper>,
    @inject(ITYPES.Controller) common: IBaseCrudController<Shopper>
  ) {
    this.shopperService = shopperService;
    this.common = common;
  }

  /**
   * * POST /shopper/register
   */
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data: ShopperRegisterReq = req.body;
      const result = await this.shopperService.register(data);
      res.send_ok('Register success, waiting for activate phone number', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * Check register info exists
   * * GET /shopper/register/validation
   */
  async validationRegister(req: Request, res: Response, next: NextFunction) {
    try {
      const data: ShopperValidateRegisterReq = req.body;

      const result = await this.shopperService.validationRegister(data);

      res.send_ok('Validation success');
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /shopper/activation/phone/?phoneNumber=xxx&code=xxx
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

      await this.shopperService.activatePhoneNumber(phoneNumber, code);
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
   * * POST /shopper/activation/email
   */
  async activateEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const shopperId = req.user?.id;
      if (!shopperId) {
        throw new BaseError(ErrorCode.AUTH_01, 'Unauthorized');
      }
      if (!email) {
        res.send_badRequest('Email is required', new BaseError(ErrorCode.VALIDATION_ERROR, 'Email is required'));
      }
      await this.shopperService.activateEmail(shopperId!, email);
      res.send_ok('Activate email success');
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /shopper/verify-email-token/?email=xxx&token=xxx
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
      await this.shopperService.verifyEmailToken(email, token);
      res.send_ok('Verify email token success');
    } catch (error) {
      next(error);
    }
  }

  /**
   * * POST /shopper/login
   */
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data: ShopperLoginReq = req.body;
      const result: ShopperLoginRes = await this.shopperService.login(data);
      res.send_ok('Login success', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /shopper/me
   */
  async me(req: Request, res: Response, next: NextFunction) {
    try {
      const shopperId = req.user?.id;

      if (!shopperId) {
        throw new BaseError(ErrorCode.AUTH_01, 'Unauthorized');
      }
      const shopper = await this.shopperService.findOne({ filter: { id: shopperId } });
      const shopperDto: ShopperRes = convertToDto(ShopperRes, shopper);
      res.send_ok('Get me success', shopperDto);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /shopper
   */
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const shoppers = await this.shopperService.findAll();
      const shoppersDto = shoppers.map((shopper) => convertToDto(ShopperRes, shopper));
      res.send_ok('Get all shopper success', shoppersDto);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /shopper/paging
   */
  async findWithPaging(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { page, rpp } = req.query;
      const paging = new PagingDto(Number(page), Number(rpp));
      const result = await this.shopperService.findAllWithPaging({ paging });
      const resultDto = convertToDto(ShopperPagingRes, result);
      res.send_ok('Found successfully', resultDto);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /shopper/:id
   */
  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const shopper = await this.shopperService.findOne({ filter: { id } });
      if (!shopper) {
        res.send_notFound('Shopper not found');
      }
      const shopperDto: ShopperRes = convertToDto(ShopperRes, shopper);
      res.send_ok('Get shopper success', shopperDto);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /api/shopper/filter
   */
  async findWithFilter(req: Request, res: Response, next: NextFunction) {
    try {
      const filter: ShopperSearchReq = req.body;
      const { page, rpp } = req.query;
      const paging = new PagingDto(Number(page), Number(rpp));

      const result = await this.shopperService.findWithFilter(filter, paging);
      res.send_ok('Filter success', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * POST /shopper/forget-password
   */
  async forgetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      await this.shopperService.forgetPassword(data);
      res.send_ok('OTP đã được gửi tới số điện thoại của bạn');
    } catch (error) {
      next(error);
    }
  }

  /**
   * * POST /shopper/reset-password
   */
  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      await this.shopperService.resetPassword(data);
      res.send_ok('Reset password thành công');
    } catch (error) {
      next(error);
    }
  }
}
