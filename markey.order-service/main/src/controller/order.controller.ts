import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { FindOrderWithFilterReq } from '@/dto/order/find-order-with-filter.req';
import { UpdateOrderStatus } from '@/dto/order/update-status-order.req';
import { OrderStatusEnum } from '@/enums/order-status.enum';
import { RoleNameEnum } from '@/enums/role-name.enum';
import { Order } from '@/models/order.model';
import { IOrderService } from '@/service/interface/i.order.service';
import { ITYPES } from '@/types/interface.types';
import { getEnumValue } from '@/utils/get-enum-value.util';
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

  /**
   * * GET /order/me
   */
  async getMyOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const shopper = SessionUtil.getShopperCurrentlyLoggedIn(req);

      const shopperId = shopper.id;

      const result = await this.orderService.findMany({
        filter: {
          shopperId: shopperId
        },
        order: [
          {
            column: 'createAt',
            direction: 'DESC'
          }
        ]
      });

      return res.send_ok('Orders found', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * PUT /order/send-paid-event
   */
  async handlePaidEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      await this.orderService.handlePaidEvent(data);

      return res.send_ok('Order status updated');
    } catch (error) {
      next(error);
    }
  }

  /**
   * * PUT /order/status/:orderId
   */
  async changeOrderStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const data: UpdateOrderStatus = req.body;
      const orderId = req.params.id;
      const status = getEnumValue(OrderStatusEnum, data.status);
      if (status === OrderStatusEnum.APPROVED_AND_PREPARING_FOR_DELIVERY) {
        await this.orderService.checkForApproveOrder(req.user!, orderId);
      }
      await this.orderService.findOneAndUpdate({
        filter: {
          id: orderId
        },
        updateData: {
          status: status
        }
      });

      return res.send_ok('Order status updated');
    } catch (error) {
      next(error);
    }
  }

  /**
   * * POST /order/filter
   */
  async findWithFilter(req: Request, res: Response, next: NextFunction) {
    try {
      const data: FindOrderWithFilterReq = req.body;

      const paging = getPagingUtil(req);

      const result = await this.orderService.findWithFilter(data, paging);

      res.send_ok('Orders found', result);
    } catch (error) {
      next(error);
    }
  }
}
