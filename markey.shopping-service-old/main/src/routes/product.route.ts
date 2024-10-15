import { productController } from '@/container/product.container';
import { CreateProductReq } from '@/dto/product/create-product.req';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';
const productRouter = express.Router();

productRouter

  .get('/', productController.findAll.bind(productController))

  .post('/', classValidate(CreateProductReq), productController.create.bind(productController));

export default productRouter;
