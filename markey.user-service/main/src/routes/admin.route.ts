import { PERMISSION_CONSTANTS } from '@/constants/permission.constants';
import { adminController } from '@/container/admin.container';
import { AdminLoginReq } from '@/dto/admin/admin-login.req';
import { authenticateJWT } from '@/middleware/authenticate.middleware';
import { checkPermission } from '@/middleware/check-permission.middleware';
import { classValidate } from '@/middleware/class-validate.middleware';
import { Permission } from '@/models/permission.model';
import express from 'express';
const adminRouter = express.Router();

adminRouter

  .put(
    '/unblock-shopper/:shopperId',
    authenticateJWT,
    checkPermission([PERMISSION_CONSTANTS.MANAGE_SHOPPER]),
    adminController.unBlockShopper.bind(adminController)
  )

  .put(
    '/unblock-salesman/:salesmanId',
    checkPermission([PERMISSION_CONSTANTS.MANAGE_SALESMAN]),
    adminController.unBlockSalesman.bind(adminController)
  )

  .put(
    '/block-salesman/:salesmanId',
    checkPermission([PERMISSION_CONSTANTS.MANAGE_SALESMAN]),
    adminController.blockSalesman.bind(adminController)
  )

  .put(
    '/block-shopper/:shopperId',
    checkPermission([PERMISSION_CONSTANTS.MANAGE_SHOPPER]),
    adminController.blockShopper.bind(adminController)
  )

  .put('/approve-salesman/:salesmanId', adminController.approveSalesman.bind(adminController))

  .get(
    '/me',
    authenticateJWT,
    checkPermission([PERMISSION_CONSTANTS.MANAGE_ADMIN]),
    adminController.getMeDetail.bind(adminController)
  )

  .get(
    '/',
    authenticateJWT,
    checkPermission([PERMISSION_CONSTANTS.MANAGE_ADMIN]),
    adminController.findAll.bind(adminController)
  )
  .post('/login', classValidate(AdminLoginReq), adminController.login.bind(adminController));

export default adminRouter;
