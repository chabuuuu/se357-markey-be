import { TIME_CONSTANTS } from '@/constants/time.constants';
import { SalesmanLoginReq } from '@/dto/salesman/salesman-login.req';
import { SalesmanLoginRes } from '@/dto/salesman/salesman-login.res';
import { SalesmanRegisterReq } from '@/dto/salesman/salesman-register.req';
import { SalesmanRegisterRes } from '@/dto/salesman/salesman-register.res';
import { SmsActivateCacheDto } from '@/dto/sms-activate-cache.dto';
import { ErrorCode } from '@/enums/error-code.enums';
import { LoginTypeEnum } from '@/enums/login-type.enum';
import { RedisSchemaEnum } from '@/enums/redis-schema.enum';
import { RoleNameEnum } from '@/enums/role-name.enum';
import { Salesman } from '@/models/salesman.model';
import { Shop } from '@/models/shop.model';
import { ISalesmanRepository } from '@/repository/interface/i.salesman.repository';
import { IShopRepository } from '@/repository/interface/i.shop.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { ISalesmanService } from '@/service/interface/i.salesman.service';
import { convertToDto } from '@/utils/dto-convert/convert-to-dto.util';
import { sendEmailForActivation } from '@/utils/email/send-email-for-activation.util';
import BaseError from '@/utils/error/base.error';
import { generateRandomString } from '@/utils/random/generate-random-string.util';
import redis from '@/utils/redis/redis.util';
import { sendSmsForActivation } from '@/utils/sms/send-sms-for-activation.util';
import { inject, injectable } from 'inversify';
import bcrypt from 'bcrypt';
import { IRoleRepository } from '@/repository/interface/i.role.repository';
import { Role } from '@/models/role.model';
import { JwtClaimDto } from '@/dto/jwt-claim.dto';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { CreateShopReq } from '@/dto/shop/create-shop.req';
import { PagingDto } from '@/dto/paging.dto';
import { SearchSalesmanReq } from '@/dto/salesman/salesman-filter.res';
import { RecordOrderType } from '@/types/record-order.types';
import { Like } from 'typeorm';
import { PagingResponseDto } from '@/dto/paging-response.dto';
import { SalesmanListSelect } from '@/dto/salesman/salesman-list.select';
import { sendSms } from '@/utils/sms/sms-sender.utils';
import { SalesmanResetPasswordReq } from '@/dto/salesman/salesman-reset-password';
import { SalesmanForgetPasswordReq } from '@/dto/salesman/salesman-forget-password.req';

@injectable()
export class SalesmanService extends BaseCrudService<Salesman> implements ISalesmanService<Salesman> {
  private salesmanRepository: ISalesmanRepository<Salesman>;
  private shopRepository: IShopRepository;
  private roleRepository: IRoleRepository<Role>;

  constructor(
    @inject('SalesmanRepository') salesmanRepository: ISalesmanRepository<Salesman>,
    @inject('ShopRepository') shopRepository: IShopRepository,
    @inject('RoleRepository') roleRepository: IRoleRepository<Role>
  ) {
    super(salesmanRepository);
    this.salesmanRepository = salesmanRepository;
    this.shopRepository = shopRepository;
    this.roleRepository = roleRepository;
  }

  /**
   * * Reset password after receive code 6 number
   * @param data
   */
  async resetPassword(data: SalesmanResetPasswordReq): Promise<void> {
    const { phoneNumber, code, password } = data;

    const existsSend = await redis.get(`${RedisSchemaEnum.forgetPassword}::${phoneNumber}`);

    if (!existsSend) {
      throw new BaseError(ErrorCode.INVALID_CODE, 'Code is expired');
    }

    if (existsSend !== code) {
      throw new BaseError(ErrorCode.INVALID_CODE, 'Invalid code');
    }

    const salesman = await this.salesmanRepository.findOne({
      filter: {
        phoneNumber: phoneNumber
      }
    });
    if (!salesman) {
      throw new BaseError(ErrorCode.NF_01, 'Salesman not found');
    }

    salesman.password = bcrypt.hashSync(password, 10);

    await this.salesmanRepository.findOneAndUpdate({
      filter: {
        phoneNumber: phoneNumber
      },
      updateData: {
        password: salesman.password
      }
    });

    return;
  }

  /**
   * * Forget password
   * * Send code 6 number to phone number
   * @param phoneNumber
   */
  async forgetPassword(data: SalesmanForgetPasswordReq): Promise<void> {
    const { phoneNumber } = data;

    const existsSend = await redis.get(`${RedisSchemaEnum.forgetPassword}::${phoneNumber}`);

    if (existsSend) {
      throw new BaseError(
        ErrorCode.BAD_REQUEST,
        'Verification code has been sent to your phone number. Please wait for 5 minuets before sending again'
      );
    }

    const salesman = await this.salesmanRepository.findOne({
      filter: {
        phoneNumber: phoneNumber
      }
    });
    if (!salesman) {
      throw new BaseError(ErrorCode.NF_01, 'Salesman not found');
    }

    const randomToken = await generateRandomString();

    await redis.set(
      `${RedisSchemaEnum.forgetPassword}::${phoneNumber}`,
      randomToken,
      'EX',
      (TIME_CONSTANTS.MINUTE * 5) / 1000
    );

    //Send sms to phone number
    sendSms(
      `Hello from Markey Store!\nYour otp code for reset password is ${randomToken}.\nPlease do not share this code with anyone.`,
      [phoneNumber]
    );

    return;
  }

  async findWithFilter(filter: SearchSalesmanReq, paging: PagingDto): Promise<PagingResponseDto<Salesman>> {
    let where = {};
    const sort: RecordOrderType[] = [];
    if (filter.sort) {
      sort.push({
        column: filter.sort.by,
        direction: filter.sort.order
      });
    }

    if (filter.fullname) {
      where = {
        ...where,
        fullname: Like(`%${filter.fullname}%`)
      };
    }

    if (filter.id) {
      where = {
        ...where,
        id: filter.id
      };
    }

    if (filter.isApproved !== undefined || filter.isApproved !== null) {
      where = {
        ...where,
        isApproved: filter.isApproved
      };
    }

    if (filter.isBlocked !== undefined || filter.isBlocked !== null) {
      where = {
        ...where,
        isBlocked: filter.isBlocked
      };
    }

    const salesman = await this.salesmanRepository.findMany({
      filter: where,
      paging: paging,
      order: sort,
      select: SalesmanListSelect
    });

    const totalRecords = await this.baseRepository.count({
      filter: where
    });
    return {
      items: salesman,
      total: totalRecords
    };
  }

  async login(data: SalesmanLoginReq): Promise<SalesmanLoginRes> {
    const { phoneNumberOrEmail, password } = data;
    const salesmanWithPhone = await this.salesmanRepository.findOne({
      filter: { phoneNumber: phoneNumberOrEmail }
    });
    const salesmanWithEmail = await this.salesmanRepository.findOne({
      filter: { email: phoneNumberOrEmail, emailVerified: true }
    });

    if (!salesmanWithPhone && !salesmanWithEmail) {
      throw new BaseError(ErrorCode.NF_01, 'Salesman not found');
    }
    const salesman = salesmanWithPhone || salesmanWithEmail;

    //Check if salesman is approved or not?
    if (!salesman!.isApproved) {
      throw new BaseError(ErrorCode.AUTH_01, 'Salesman is not approved');
    }

    //Check if salesman is blocked or not?
    if (salesman!.isBlocked) {
      throw new BaseError(ErrorCode.AUTH_01, 'Salesman is blocked');
    }

    if (!bcrypt.compareSync(password, salesman!.password)) {
      throw new BaseError(ErrorCode.AUTH_01, 'Password is incorrect');
    }

    const salesmanRole = await this.roleRepository.findOne({
      filter: {
        name: RoleNameEnum.salesman
      }
    });

    const salesmanPermissions = await salesmanRole?.permissions;

    const salesmanPermissionCodes = salesmanPermissions!.map((permission) => permission.code) || [''];

    const jwtClaim = new JwtClaimDto(salesman!.id, '', salesmanPermissionCodes, salesmanRole!.name);

    const secretKey = process.env.LOGIN_SECRET_KEY || '';

    const token = jwt.sign(_.toPlainObject(jwtClaim), secretKey, {
      expiresIn: TIME_CONSTANTS.DAY * 3,
      issuer: 'markey-backend'
    });

    return new SalesmanLoginRes(token);
  }

  async verifyEmailToken(email: string, token: string): Promise<void> {
    const salesman = await this.salesmanRepository.findOne({
      filter: {
        email: email
      }
    });
    if (!salesman) {
      throw new BaseError(ErrorCode.ENTITY_NOT_FOUND, 'Salesman not found');
    }
    if (salesman.emailVerified) {
      throw new BaseError(ErrorCode.BAD_REQUEST, 'Email already verified');
    }
    const tokenInRedis = await redis.get(`${RedisSchemaEnum.activeSalesmanEmail}::${email}`);

    if (tokenInRedis !== token) {
      throw new BaseError(ErrorCode.INVALID_CODE, 'Invalid code');
    }

    salesman.emailVerified = true;

    await this.salesmanRepository.findOneAndUpdate({
      filter: {
        email: email
      },
      updateData: salesman
    });

    return;
  }

  async activateEmail(salesmanId: string, email: string): Promise<void> {
    const salesman = await this.salesmanRepository.findOne({
      filter: {
        id: salesmanId
      }
    });
    if (!salesman) {
      throw new BaseError(ErrorCode.ENTITY_NOT_FOUND, 'Salesman not found');
    }
    if (salesman.emailVerified) {
      throw new BaseError(ErrorCode.BAD_REQUEST, 'Email already verified');
    }
    await sendEmailForActivation(RedisSchemaEnum.activeSalesmanEmail, RoleNameEnum.salesman, email);
    return;
  }

  async approve(salesmanId: string): Promise<void> {
    const salesman = await this.salesmanRepository.findOne({
      filter: {
        id: salesmanId
      }
    });
    if (!salesman) {
      throw new BaseError(ErrorCode.ENTITY_NOT_FOUND, 'Salesman not found');
    }
    salesman.isApproved = true;

    await this.salesmanRepository.findOneAndUpdate({
      filter: {
        id: salesmanId
      },
      updateData: salesman
    });

    return;
  }
  async activatePhoneNumber(phoneNumber: string, code: string): Promise<string> {
    console.log('Activate phone number', phoneNumber, code);

    const smsActivateCache = await redis.get(`${RedisSchemaEnum.noneActivePhoneUserData}::${phoneNumber}`);
    if (!smsActivateCache) {
      throw new BaseError(ErrorCode.PHONE_NUMBER_NOT_FOUND, 'Phone number not found');
    }

    const smsActivateCacheDto: SmsActivateCacheDto = JSON.parse(smsActivateCache);
    if (smsActivateCacheDto.code !== code) {
      throw new BaseError(ErrorCode.INVALID_CODE, 'Invalid code');
    }

    const { tempUser } = smsActivateCacheDto;

    const salesman = convertToDto(SalesmanRegisterReq, tempUser);
    const createdSalesman = await this.salesmanRepository.create({
      data: salesman
    });

    //Call shopping service to create shop
    const createShopReq = new CreateShopReq();
    createShopReq.salesmanId = createdSalesman.id;
    createShopReq.name = salesman.shop.name;
    createShopReq.description = salesman.shop.description;
    createShopReq.profilePicture = salesman.shop.profilePicture;

    this.shopRepository.createShop(createShopReq);

    return 'Activate phone number success, please waiting for admin approve';
  }

  async register(data: SalesmanRegisterReq): Promise<SalesmanRegisterRes> {
    console.log('Registering salesman', data);

    // if (
    //   await this.shopRepository.exists({
    //     filter: {
    //       name: data.shop.name
    //     }
    //   })
    // ) {
    //   throw new BaseError(ErrorCode.DUPLICATE_DATA, 'Shop name already exists');
    // }

    if (
      await this.salesmanRepository.exists({
        filter: {
          email: data.email
        }
      })
    ) {
      throw new BaseError(ErrorCode.DUPLICATE_DATA, 'Email already exists');
    }

    if (
      await this.salesmanRepository.exists({
        filter: {
          phoneNumber: data.phoneNumber
        }
      })
    ) {
      throw new BaseError(ErrorCode.DUPLICATE_DATA, 'Phone number already exists');
    }
    data.password = bcrypt.hashSync(data.password, 10);

    //Valid phone number or email
    await sendSmsForActivation(data.phoneNumber, data);

    const resultDto = convertToDto(SalesmanRegisterRes, data);
    return resultDto;
  }

  async deleteBySalesmanId(salesmanId: string): Promise<void> {
    await this.baseRepository.findOneAndDelete({
      filter: {
        id: salesmanId
      }
    });

    // const shop = await this.shopRepository.findOne({
    //   filter: {
    //     salesmanId: salesmanId
    //   }
    // });

    // if (shop) {
    //   await this.shopRepository.findOneAndDelete({
    //     filter: {
    //       id: shop!.id
    //     }
    //   });
    // }

    return;
  }
}
