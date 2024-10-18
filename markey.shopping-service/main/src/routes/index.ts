import { ErrorCode } from '@/enums/error-code.enums';
import accountRouter from '@/routes/account.route';
import categoryRouter from '@/routes/category.route';
import productRouter from '@/routes/product.route';
import productRatingRouter from '@/routes/product_rating.route';
import roleRouter from '@/routes/role.route';
import shoppingCartRouter from '@/routes/shopping_cart.route';
import BaseError from '@/utils/error/base.error';

export function route(app: any) {
  app.use('/product-rating', productRatingRouter);
  app.use('/cart', shoppingCartRouter);
  app.use('/product', productRouter);
  app.use('/category', categoryRouter);
  app.use(`/account`, accountRouter);
  app.use(`/role`, roleRouter);
  app.all('*', (req: any, res: any, next: any) => {
    const err = new BaseError(ErrorCode.API_NOT_EXISTS, 'API Not Exists');
    next(err);
  });
}
