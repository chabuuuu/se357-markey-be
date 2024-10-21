import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { Order } from '@/models/order.model';
import { IOrderService } from '@/service/interface/i.order.service';
import { ITYPES } from '@/types/interface.types';
import { getPagingUtil } from '@/utils/get-paging.util';
import { SessionUtil } from '@/utils/session-util';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class OrderController {
  public common: IBaseCrudController<Order>;
  private orderService: IOrderService<Order>;
  constructor(
    @inject('OrderService') orderService: IOrderService<Order>,
    @inject(ITYPES.Controller) common: IBaseCrudController<Order>
  ) {
    this.orderService = orderService;
    this.common = common;
  }

  /**
   * * POST /order
   */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      const shopper = SessionUtil.getShopperCurrentlyLoggedIn(req);

      const shopperId = shopper.id;

      const result = await this.orderService.createOrder(shopperId, data);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /order/:id
   */
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const result = await this.orderService.findOne({
        filter: {
          id: id
        },
        relations: ['items']
      });
      res.send_ok('Order found', result);
    } catch (error) {
      next(error);
    }
  }
}
