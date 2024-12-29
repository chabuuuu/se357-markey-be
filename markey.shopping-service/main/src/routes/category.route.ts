import { PERMISSIONS } from '@/constants/permission.constants';
import { categoryController } from '@/container/category.container';
import { CreateCategoryReq } from '@/dto/category/create-category.req';
import { UpdateCategoryReq } from '@/dto/category/update-category.req';
import { checkPermission } from '@/middleware/check-permission.middleware';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';
const categoryRouter = express.Router();

categoryRouter
  .post('/', classValidate(CreateCategoryReq), categoryController.create.bind(categoryController))
  .put('/:id', classValidate(UpdateCategoryReq), categoryController.update.bind(categoryController))
  .delete('/:id', categoryController.delete.bind(categoryController))
  .get('/paging', categoryController.findWithPaging.bind(categoryController))
  .get('/:id', categoryController.findOne.bind(categoryController))
  .get('/', categoryController.findAll.bind(categoryController));

export default categoryRouter;
