import { PERMISSION_CONSTANTS } from '@/constants/permission.constants';
import { salesmanController } from '@/container/salesman.container';
import { EmailActivateReq } from '@/dto/email-activate.req';
import { SalesmanChangePasswordReq } from '@/dto/salesman/salesman-change-password.req';
import { SearchSalesmanReq } from '@/dto/salesman/salesman-filter.res';
import { SalesmanForgetPasswordReq } from '@/dto/salesman/salesman-forget-password.req';
import { SalesmanLoginReq } from '@/dto/salesman/salesman-login.req';
import { SalesmanRegisterReq } from '@/dto/salesman/salesman-register.req';
import { SalesmanResetPasswordReq } from '@/dto/salesman/salesman-reset-password';
import { authenticateJWT } from '@/middleware/authenticate.middleware';
import { checkPermission } from '@/middleware/check-permission.middleware';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';
const salesmanRouter = express.Router();

salesmanRouter
  .put(
    '/change-password',
    authenticateJWT,
    classValidate(SalesmanChangePasswordReq),
    salesmanController.changePassword.bind(salesmanController)
  )

  .put(
    '/:salesmanId',
    authenticateJWT,
    //checkPermission([PERMISSION_CONSTANTS.MANAGE_SALESMAN]),
    salesmanController.updateBySalesmanId.bind(salesmanController)
  )
  .put(
    '/approve/:salesmanId',
    authenticateJWT,
    checkPermission([PERMISSION_CONSTANTS.MANAGE_SALESMAN]),
    salesmanController.approve.bind(salesmanController)
  )

  .post(
    '/forget-password',
    classValidate(SalesmanForgetPasswordReq),
    salesmanController.forgetPassword.bind(salesmanController)
  )

  .post(
    '/reset-password',
    classValidate(SalesmanResetPasswordReq),
    salesmanController.resetPassword.bind(salesmanController)
  )

  .post('/filter', salesmanController.findWithFilter.bind(salesmanController))

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

  .get('/me', authenticateJWT, salesmanController.getMeDetail.bind(salesmanController))

  .get(
    '/:salesmanId',
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
    '/:salesmanId',
    authenticateJWT,
    checkPermission([PERMISSION_CONSTANTS.MANAGE_SALESMAN]),
    salesmanController.delete.bind(salesmanController)
  );

export default salesmanRouter;
