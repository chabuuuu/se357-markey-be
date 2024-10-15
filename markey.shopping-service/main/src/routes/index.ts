import { ErrorCode } from '@/enums/error-code.enums';
import accountRouter from '@/routes/account.route';
import roleRouter from '@/routes/role.route';
import BaseError from '@/utils/error/base.error';

export function route(app: any) {
  app.use(`/account`, accountRouter);
  app.use(`/role`, roleRouter);
  app.all('*', (req: any, res: any, next: any) => {
    const err = new BaseError(ErrorCode.API_NOT_EXISTS, 'API Not Exists');
    next(err);
  });
}
