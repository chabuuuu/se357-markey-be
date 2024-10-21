import { ErrorCode } from '@/enums/error-code.enums';
import paymentRouter from '@/routes/payment.route';
import BaseError from '@/utils/error/base.error';

export function route(app: any) {
  app.use('/payment', paymentRouter);
  app.all('*', (req: any, res: any, next: any) => {
    const err = new BaseError(ErrorCode.API_NOT_EXISTS, 'API Not Exists');
    next(err);
  });
}
