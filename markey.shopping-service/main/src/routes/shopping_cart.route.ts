import { shoppingCartController } from '@/container/shopping_cart.container';
import { AddToCartReq } from '@/dto/cart/add-to-cart.req';
import { CreateCartReq } from '@/dto/cart/create-cart.req';
import { UpdateCartReq } from '@/dto/cart/udpate-cart.req';
import { authenticateJWT } from '@/middleware/authenticate.middleware';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';
const shoppingCartRouter = express.Router();

shoppingCartRouter

  .put(
    '/update',
    authenticateJWT,
    classValidate(UpdateCartReq),
    shoppingCartController.updateToCart.bind(shoppingCartController)
  )

  .post('/', classValidate(CreateCartReq), shoppingCartController.createCart.bind(shoppingCartController))

  .post(
    '/add',
    authenticateJWT,
    classValidate(AddToCartReq),
    shoppingCartController.addToCart.bind(shoppingCartController)
  )
  .get('/by-shopper/:shopperId', shoppingCartController.getCartByShopper.bind(shoppingCartController))

  .get(
    '/me/group-by-created-date',
    authenticateJWT,
    shoppingCartController.getMyCartGroupByCreatedDate.bind(shoppingCartController)
  )

  .get('/me', authenticateJWT, shoppingCartController.getMyCart.bind(shoppingCartController));

export default shoppingCartRouter;
