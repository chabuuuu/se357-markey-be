import { orderController } from '@/container/order.container';
import { CreateOrderReq } from '@/dto/order/create-order.req';
import { authenticateJWT } from '@/middleware/authenticate.middleware';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';
const orderRouter = express.Router();

orderRouter

  .put('/send-paid-event', orderController.handlePaidEvent.bind(orderController))

  .get('/me', authenticateJWT, orderController.getMyOrders.bind(orderController))

  .get('/paging', orderController.common.findWithPaging.bind(orderController.common))

  .get('/:id', orderController.getById.bind(orderController))

  .get('/', orderController.common.findAll.bind(orderController.common))

  .post('/', authenticateJWT, classValidate(CreateOrderReq), orderController.create.bind(orderController));

export default orderRouter;
