import { categoryController } from '@/container/category.container';
import { CreateCategoryReq } from '@/dto/category/create-category.req';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';
const categoryRouter = express.Router();

categoryRouter

  .delete('/:id', categoryController.common.delete.bind(categoryController.common))

  .get('/paging', categoryController.common.findWithPaging.bind(categoryController.common))

  .get('/:id', categoryController.common.findOne.bind(categoryController.common))

  .get('/', categoryController.common.findAll.bind(categoryController.common))

  .post('/', classValidate(CreateCategoryReq), categoryController.common.create.bind(categoryController.common));

export default categoryRouter;
