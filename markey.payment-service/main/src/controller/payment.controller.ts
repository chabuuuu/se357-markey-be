import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { ErrorCode } from '@/enums/error-code.enums';
import { Payment } from '@/models/payment.model';
import { IPaymentService } from '@/service/interface/i.payment.service';
import { ITYPES } from '@/types/interface.types';
import BaseError from '@/utils/error/base.error';
import { checkVnpReturnUtil } from '@/utils/vnpay/check-vnp-return.util';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import requestIp from 'request-ip';

@injectable()
export class PaymentController {
  public common: IBaseCrudController<Payment>;
  private paymentService: IPaymentService<Payment>;
  constructor(
    @inject('PaymentService') paymentService: IPaymentService<Payment>,
    @inject(ITYPES.Controller) common: IBaseCrudController<Payment>
  ) {
    this.paymentService = paymentService;
    this.common = common;
  }

  /**
   * * POST /
   * @description Create a new payment
   */
  async create(req: Request, res: Response, next: NextFunction) {
    return this.common.create(req, res, next);
  }

  /**
   * * GET /by-order/:orderId
   */
  async getByOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { orderId } = req.params;
      const payment = await this.paymentService.findOne({
        filter: {
          orderId: orderId
        }
      });

      return res.send_ok('Payment found', payment);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /vnp-url/:paymentId
   */
  async getVnpUrl(req: Request, res: Response, next: NextFunction) {
    try {
      const { paymentId } = req.params;
      const ipAddr = requestIp.getClientIp(req);

      if (!ipAddr) {
        throw new BaseError(ErrorCode.VALIDATION_ERROR, 'IP Address not found');
      }

      const result = await this.paymentService.getVnpUrl(paymentId, ipAddr);

      return res.send_ok('Generate url success', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /vnp-return
   */
  async vnpReturn(req: Request, res: Response, next: NextFunction) {
    try {
      checkVnpReturnUtil(req);

      const vnp_Params = req.query;

      await this.paymentService.handleVNPayReturn(vnp_Params);

      return res.send_ok('Payment success');
    } catch (error) {
      next(error);
    }
  }
}
