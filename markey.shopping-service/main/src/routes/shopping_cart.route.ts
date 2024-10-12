import { shoppingCartController } from '@/container/shopping_cart.container';
import { AddToCartReq } from '@/dto/cart/add-to-cart.req';
import { CreateCartReq } from '@/dto/cart/create-cart.req';
import { authenticateJWT } from '@/middleware/authenticate.middleware';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';
const shoppingCartRouter = express.Router();

shoppingCartRouter

  .post('/create-cart', classValidate(CreateCartReq), shoppingCartController.createCart.bind(shoppingCartController))

  .post(
    '/add-to-cart',
    authenticateJWT,
    classValidate(AddToCartReq),
    shoppingCartController.addToCart.bind(shoppingCartController)
  )

  .get('/', authenticateJWT, shoppingCartController.getMyCart.bind(shoppingCartController));

export default shoppingCartRouter;
