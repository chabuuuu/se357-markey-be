import { ErrorCode } from '@/enums/error-code.enums';
import { RedisSchemaEnum } from '@/enums/redis-schema.enum';
import { GlobalConfig } from '@/utils/config/global-config.util';
import { transporter } from '@/utils/email/email-transporter.util';
import BaseError from '@/utils/error/base.error';
import redis from '@/utils/redis/redis.util';
import CryptoJS from 'crypto-js';

/**
 *
 * @param redisSchema the schema of redis
 * @param role the role of user
 * @param email the email of user
 * @returns
 */
export async function sendEmailForActivation(redisSchema: string, role: string, email: string): Promise<any> {
  try {
    const token = CryptoJS.lib.WordArray.random(16).toString();
    console.log(email);
    if (await redis.get(`${redisSchema}::${email}`)) {
      throw new BaseError(ErrorCode.BAD_REQUEST, 'Email was sent. Please check your email and try again in 5 minutes');
    }

    const fiveMinuteInSeconds = 60 * 5;
    redis.set(`${redisSchema}::${email}`, token, 'EX', fiveMinuteInSeconds);
    const mailOptions = {
      from: {
        name: 'Markey Store',
        address: process.env.EMAIL_USERNAME || ''
      },
      to: email,
      subject: 'Xác thực email',
      text: `Hãy nhấn vào đường link này để xác thực email của bạn: ${GlobalConfig.gateway.url}/${role}/verify-email-token?email=${email}&token=${token}`
    };

    transporter.sendMail(mailOptions);
    //console.log('Email sent: ', result);

    return {
      status: 'suscess',
      message: `Email was sent to ${email}`
    } as any;
  } catch (error) {
    if (error instanceof BaseError) {
      throw error;
    }
    console.log(error);
  }
}
