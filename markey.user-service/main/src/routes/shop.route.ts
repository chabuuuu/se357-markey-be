import { shopController } from '@/container/shop.container';
import express from 'express';
const shopRouter = express.Router();

shopRouter
  .get('/', shopController.common.findAll.bind(shopController.common))
  .get('/paging', shopController.common.findWithPaging.bind(shopController.common))
  .get('/:id', shopController.common.findOne.bind(shopController.common));

export default shopRouter;
