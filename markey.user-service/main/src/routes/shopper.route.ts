import { PERMISSION_CONSTANTS } from '@/constants/permission.constants';
import { shopperController } from '@/container/shopper.container';
import { EmailActivateReq } from '@/dto/email-activate.req';
import { ShopperLoginReq } from '@/dto/shopper/shopper-login.req';
import { ShopperRegisterReq } from '@/dto/shopper/shopper-register.req';
import { ShopperUpdateReq } from '@/dto/shopper/shopper-update.req';
import { ShopperValidateRegisterReq } from '@/dto/shopper/shopper-valiate-registr.req';
import { authenticateJWT } from '@/middleware/authenticate.middleware';
import { checkPermission } from '@/middleware/check-permission.middleware';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';
const shopperRouter = express.Router();

shopperRouter
  .put('/:id', classValidate(ShopperUpdateReq), shopperController.common.update.bind(shopperController.common))

  .post('/register', classValidate(ShopperRegisterReq), shopperController.register.bind(shopperController))

  .post(
    '/activate/email',
    authenticateJWT,
    classValidate(EmailActivateReq),
    shopperController.activateEmail.bind(shopperController)
  )

  .post(
    '/register/validation',
    classValidate(ShopperValidateRegisterReq),
    shopperController.validationRegister.bind(shopperController)
  )

  .post('/login', classValidate(ShopperLoginReq), shopperController.login.bind(shopperController))

  .get('/activation/phone', shopperController.activatePhoneNumber.bind(shopperController))

  .get('/verify-email-token', shopperController.verifyEmailToken.bind(shopperController))

  .get('/me', authenticateJWT, shopperController.me.bind(shopperController))

  .get(
    '/paging',
    authenticateJWT,
    checkPermission([PERMISSION_CONSTANTS.MANAGE_SHOPPER]),
    shopperController.findWithPaging.bind(shopperController)
  )

  .get(
    '/:id',
    authenticateJWT,
    checkPermission([PERMISSION_CONSTANTS.MANAGE_SHOPPER]),
    shopperController.findOne.bind(shopperController)
  )

  .get(
    '/',
    authenticateJWT,
    checkPermission([PERMISSION_CONSTANTS.MANAGE_SHOPPER]),
    shopperController.findAll.bind(shopperController)
  );

export default shopperRouter;
