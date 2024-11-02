import { TIME_CONSTANTS } from '@/constants/time.constants';
import { SmsActivateCacheDto } from '@/dto/sms-activate-cache.dto';
import { ErrorCode } from '@/enums/error-code.enums';
import { RedisSchemaEnum } from '@/enums/redis-schema.enum';
import BaseError from '@/utils/error/base.error';
import { generateRandomString } from '@/utils/random/generate-random-string.util';
import redis from '@/utils/redis/redis.util';
import { sendSms } from '@/utils/sms/sms-sender.utils';

/**
 *  Send sms for activation
 * @param phoneNumber phone number for send sms
 * @param tempUser temp user data wait for activation
 */
export async function sendSmsForActivation(phoneNumber: string, tempUser: any) {
  try {
    if (await redis.get(`${RedisSchemaEnum.noneActivePhoneUserData}::${phoneNumber}`)) {
      throw new BaseError(
        ErrorCode.BAD_REQUEST,
        'Verification code has been sent to your phone number. Please wait for 5 minuets before sending again'
      );
    }
    const randomToken = await generateRandomString();
    redis.set(
      `${RedisSchemaEnum.noneActivePhoneUserData}::${phoneNumber}`,
      JSON.stringify(new SmsActivateCacheDto(tempUser, randomToken)),
      'EX',
      (TIME_CONSTANTS.MINUTE * 5) / 1000
    );
    sendSms(`Hello from Markey Store!\nYour verification code is ${randomToken}`, [phoneNumber]);
  } catch (error) {
    console.log(error);
    if (error instanceof BaseError) {
      throw error;
    }
  }
}
