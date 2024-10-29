import { productController } from '@/container/product.container';
import { CreateProductReq } from '@/dto/product/create-product.req';
import { UpdateProductReq } from '@/dto/product/update-product.req';
import { authenticateJWT } from '@/middleware/authenticate.middleware';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';
const productRouter = express.Router();

productRouter
  .post('/filter', productController.findWithFilter.bind(productController))
  .post('/', authenticateJWT, classValidate(CreateProductReq), productController.create.bind(productController))
  .get('/by-shop/:shopId', productController.findByShopId.bind(productController))
  .get('/by-category/:categoryId', productController.findByCategoryId.bind(productController))
  .get('/paging', productController.findWithPaging.bind(productController))
  .get('/:id', productController.findOne.bind(productController))
  .get('/', productController.findAll.bind(productController))
  .put('/:id', classValidate(UpdateProductReq), productController.common.update.bind(productController.common))
  .delete('/:id', productController.common.delete.bind(productController.common));
export default productRouter;
