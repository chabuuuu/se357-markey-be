import { ErrorCode } from '@/enums/error-code.enums';
import BaseError from '@/utils/error/base.error';

export function getEnumValue(enumObj: any, key: string): string {
  if (key in enumObj) {
    return enumObj[key];
  }
  throw new BaseError(ErrorCode.VALIDATION_ERROR, 'Enum not valid');
}
