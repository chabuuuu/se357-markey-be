import { ErrorCode } from '@/enums/error-code.enums';
import BaseError from '@/utils/error/base.error';
import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { QueryFailedError, TypeORMError } from 'typeorm';

/**
 * Middleware to handle the error before sending it to the client
 * @param error
 * @param req
 * @param res
 * @param next
 */
export const globalErrorHanlder = (error: any, req: Request, res: Response, next: NextFunction) => {
  console.error(error);

  if (error instanceof BaseError) {
    switch (error.code) {
      case ErrorCode.VALIDATION_ERROR:
        return res.send_badRequest('Validation Error', error);
      case ErrorCode.NF_01:
        return res.send_notFound('Not Found Error', error);
      case ErrorCode.AUTH_01:
        return res.send_unauthorized('Authorization Error', error);
      case ErrorCode.AUTH_02:
        return res.send_unauthorized('Authorization Error', error);
      case ErrorCode.PERMISSION_01:
        return res.send_forbidden('Permission Error', error);
      case ErrorCode.DUPLICATE_DATA:
        return res.send_badRequest('Duplicate Data Error', error);
      case ErrorCode.BAD_REQUEST:
        return res.send_badRequest('Bad Request Error', error);
    }
  }

  if (error instanceof TypeORMError) {
    if (error instanceof QueryFailedError) {
      return res.send_badRequest('Query Failed Error', error.message);
    }
  }

  return res.send_internalServerError(ReasonPhrases.INTERNAL_SERVER_ERROR, error.message);
};
