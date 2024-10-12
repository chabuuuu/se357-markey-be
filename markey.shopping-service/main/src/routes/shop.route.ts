import { PERMISSIONS } from '@/constants/permission.constants';
import { shopController } from '@/container/shop.container';
import { CreateShopReq } from '@/dto/shop/create-shop.req';
import { UpdateShopReq } from '@/dto/shop/update-shop.req';
import { authenticateJWT } from '@/middleware/authenticate.middleware';
import { checkPermission } from '@/middleware/check-permission.middleware';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';
const shopRouter = express.Router();

shopRouter
  .post('/create', classValidate(CreateShopReq), shopController.common.create.bind(shopController.common))

  .delete(
    '/:id',
    authenticateJWT,
    checkPermission([PERMISSIONS.MANAGE_SHOP]),
    shopController.common.delete.bind(shopController.common)
  )

  .put('/salesman-update-shop/:id', authenticateJWT, shopController.salesmanUpdateShop.bind(shopController))

  .put(
    '/admin-update-shop/:id',
    authenticateJWT,
    checkPermission([PERMISSIONS.MANAGE_SHOP]),
    classValidate(UpdateShopReq),
    shopController.common.update.bind(shopController.common)
  )

  .get('/paging', shopController.common.findWithPaging.bind(shopController.common))

  .get('/:id', shopController.common.findOne.bind(shopController.common))

  .get('/', shopController.common.findAll.bind(shopController.common));

export default shopRouter;
