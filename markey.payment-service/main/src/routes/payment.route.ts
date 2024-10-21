import { paymentController } from '@/container/payment.container';
import { CreatePaymentReq } from '@/dto/payment/create-payment.req';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';
const paymentRouter = express.Router();

paymentRouter

  .get('/vnp-return', paymentController.vnpReturn.bind(paymentController))

  .get('/vnp-url/:paymentId', paymentController.getVnpUrl.bind(paymentController))

  .get('/by-order/:orderId', paymentController.getByOrder.bind(paymentController))

  .post('/', classValidate(CreatePaymentReq), paymentController.create.bind(paymentController));

export default paymentRouter;
