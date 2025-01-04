import { orderController } from '@/container/order.container';
import { CreateOrderReq } from '@/dto/order/create-order.req';
import { FindOrderWithFilterReq } from '@/dto/order/find-order-with-filter.req';
import { UpdateOrderStatus } from '@/dto/order/update-status-order.req';
import { authenticateJWT } from '@/middleware/authenticate.middleware';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';
const orderRouter = express.Router();

orderRouter

  .put(
    '/status/:id',
    authenticateJWT,
    classValidate(UpdateOrderStatus),
    orderController.changeOrderStatus.bind(orderController)
  )

  .put('/send-paid-event', orderController.handlePaidEvent.bind(orderController))

  .get('/me', authenticateJWT, orderController.getMyOrders.bind(orderController))

  .get('/paging', orderController.common.findWithPaging.bind(orderController.common))

  .get('/:id', orderController.getById.bind(orderController))

  .get('/', orderController.common.findAll.bind(orderController.common))

  .post('/filter', orderController.findWithFilter.bind(orderController))

  .post('/', authenticateJWT, classValidate(CreateOrderReq), orderController.create.bind(orderController));

export default orderRouter;
