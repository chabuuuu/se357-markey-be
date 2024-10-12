import { shoppingCartController } from '@/container/shopping_cart.container';
import express from 'express';
const shoppingCartRouter = express.Router();

shoppingCartRouter.get('/', shoppingCartController.common.findAll.bind(shoppingCartController.common));

export default shoppingCartRouter;
