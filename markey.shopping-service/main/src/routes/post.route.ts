import { postController } from '@/container/post.container';
import { CreatePostReq } from '@/dto/post/create-post.req';
import { authenticateJWT } from '@/middleware/authenticate.middleware';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';
const postRouter = express.Router();

postRouter

  .post('/', authenticateJWT, classValidate(CreatePostReq), postController.create.bind(postController))
  .get('/by-shop/paging/:shopId', postController.getByShopPaging.bind(postController))
  .get('/by-shop/:shopId', postController.getByShop.bind(postController))
  .get('/:id', postController.getPostDetail.bind(postController))
  .get('/', postController.findAll.bind(postController))
  .delete('/:id', authenticateJWT, postController.delete.bind(postController));

export default postRouter;
