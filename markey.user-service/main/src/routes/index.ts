import { ErrorCode } from '@/enums/error-code.enums';
import adminRouter from '@/routes/admin.route';
import roleRouter from '@/routes/role.route';
import salesmanRouter from '@/routes/salesman.route';
import shopperRouter from '@/routes/shopper.route';
import BaseError from '@/utils/error/base.error';

export function route(app: any) {
  app.use(`/admin`, adminRouter);
  app.use(`/salesman`, salesmanRouter);
  app.use(`/shopper`, shopperRouter);
  app.use(`/role`, roleRouter);

  //Check health
  app.get(`/health`, (req: any, res: any) => {
    res.send('OK');
  });

  //Check if the API exists
  app.all('*', (req: any, res: any, next: any) => {
    const err = new BaseError(ErrorCode.API_NOT_EXISTS, 'API Not Exists');
    next(err);
  });
}
