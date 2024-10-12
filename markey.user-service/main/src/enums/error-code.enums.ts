export enum ErrorCode {
  /**
   * You don't have permission to access this resource
   */
  PERMISSION_01 = 'PERMISSION_01',

  //**Authenticate

  /**
   * Authorization header is required
   */
  AUTH_01 = 'AUTH_01',

  /**
   * Invalid token. You need to login first
   */
  AUTH_02 = 'AUTH_02',

  //**Common error

  /**
   * Not found {ENTITY}
   */
  NF_01 = 'NF_01',

  /**
   * Joi validate error
   */
  VALIDATION_ERROR = 'VALIDATION_ERROR',

  /**
   * API Not Exists
   */
  API_NOT_EXISTS = 'API_NOT_EXISTS',

  /**
   * Duplicate data
   */
  DUPLICATE_DATA = 'DUPLICATE_DATA',

  /**
   * General bad request
   */
  BAD_REQUEST = 'BAD_REQUEST',

  /**
   *
   */
  PHONE_NUMBER_NOT_FOUND = 'PHONE_NUMBER_NOT_FOUND',

  /**
   * A entity not found
   */
  ENTITY_NOT_FOUND = 'ENTITY_NOT_FOUND',

  /**
   * Invalid code
   */
  INVALID_CODE = 'INVALID_CODE'
}
