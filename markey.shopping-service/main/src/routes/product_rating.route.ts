import { productRatingController } from '@/container/product_rating.container';
import { CreateRatingReq } from '@/dto/rating/create-rating.req';
import { authenticateJWT } from '@/middleware/authenticate.middleware';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';
const productRatingRouter = express.Router();

productRatingRouter
  .post(
    '/',
    classValidate(CreateRatingReq),
    authenticateJWT,
    productRatingController.create.bind(productRatingController)
  )
  .get('/by-product/:productId', productRatingController.findByProductId.bind(productRatingController))
  .get('/average/:productId', productRatingController.getAvarageRating.bind(productRatingController))
  .get('/have-rated', productRatingController.haveRated.bind(productRatingController))
  .get('/:id', productRatingController.findOne.bind(productRatingController));

export default productRatingRouter;
