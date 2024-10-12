import { PERMISSION_CONSTANTS } from '@/constants/permission.constants';
import { salesmanController } from '@/container/salesman.container';
import { EmailActivateReq } from '@/dto/email-activate.req';
import { SalesmanLoginReq } from '@/dto/salesman/salesman-login.req';
import { SalesmanRegisterReq } from '@/dto/salesman/salesman-register.req';
import { authenticateJWT } from '@/middleware/authenticate.middleware';
import { checkPermission } from '@/middleware/check-permission.middleware';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';
const salesmanRouter = express.Router();

salesmanRouter
  .put(
    '/:id',
    authenticateJWT,
    checkPermission([PERMISSION_CONSTANTS.MANAGE_SALESMAN]),
    salesmanController.updateBySalesmanId.bind(salesmanController)
  )
  .put(
    '/approve/:salesmanId',
    authenticateJWT,
    checkPermission([PERMISSION_CONSTANTS.MANAGE_SALESMAN]),
    salesmanController.approve.bind(salesmanController)
  )

  .post('/login', classValidate(SalesmanLoginReq), salesmanController.login.bind(salesmanController))
  .post(
    '/activation/email',
    authenticateJWT,
    classValidate(EmailActivateReq),
    salesmanController.activateEmail.bind(salesmanController)
  )
  .post('/register', classValidate(SalesmanRegisterReq), salesmanController.register.bind(salesmanController))

  .get('/verify-email-token', salesmanController.verifyEmailToken.bind(salesmanController))
  .get('/activation/phone', salesmanController.activatePhoneNumber.bind(salesmanController))
  .get(
    '/paging',
    authenticateJWT,
    checkPermission([PERMISSION_CONSTANTS.MANAGE_SALESMAN]),
    salesmanController.common.findWithPaging.bind(salesmanController.common)
  )
  .get(
    '/:id',
    authenticateJWT,
    checkPermission([PERMISSION_CONSTANTS.MANAGE_SALESMAN]),
    salesmanController.findOneById.bind(salesmanController)
  )
  .get(
    '/',
    authenticateJWT,
    checkPermission([PERMISSION_CONSTANTS.MANAGE_SALESMAN]),
    salesmanController.common.findAll.bind(salesmanController.common)
  )

  .delete(
    '/:id',
    authenticateJWT,
    checkPermission([PERMISSION_CONSTANTS.MANAGE_SALESMAN]),
    salesmanController.delete.bind(salesmanController)
  );

export default salesmanRouter;
