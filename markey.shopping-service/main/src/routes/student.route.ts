import { studentController } from '@/container/student.container';
import express from 'express';
const studentRouter = express.Router();

studentRouter
  .get('/', studentController.common.findAll.bind(studentController.common))
  .post('/', studentController.common.create.bind(studentController.common));

export default studentRouter;
