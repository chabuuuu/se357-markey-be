import { roleController } from '@/container/role.container';
import express from 'express';
const roleRouter = express.Router();

roleRouter
  .get('/paging', roleController.common.findWithPaging.bind(roleController.common))
  .get('/:id', roleController.common.findOne.bind(roleController.common))
  .get('/', roleController.common.findAll.bind(roleController.common))
  .put('/:id', roleController.common.update.bind(roleController.common))
  .delete('/:id', roleController.common.delete.bind(roleController.common));

export default roleRouter;
