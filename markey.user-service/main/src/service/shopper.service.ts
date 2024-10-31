import { ShopperRegisterReq } from '@/dto/shopper/shopper-register.req';
import { ShopperRes } from '@/dto/shopper/shopper.res';
import { ErrorCode } from '@/enums/error-code.enums';
import { Shopper } from '@/models/shopper.model';
import { IShopperRepository } from '@/repository/interface/i.shopper.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IShopperService } from '@/service/interface/i.shopper.service';
import BaseError from '@/utils/error/base.error';
import { inject, injectable } from 'inversify';
import bcrypt from 'bcrypt';
import { sendSmsForActivation } from '@/utils/sms/send-sms-for-activation.util';
import { convertToDto } from '@/utils/dto-convert/convert-to-dto.util';
import { RedisSchemaEnum } from '@/enums/redis-schema.enum';
import redis from '@/utils/redis/redis.util';
import { RoleNameEnum } from '@/enums/role-name.enum';
import { sendEmailForActivation } from '@/utils/email/send-email-for-activation.util';
import { SmsActivateCacheDto } from '@/dto/sms-activate-cache.dto';
import { ShopperLoginReq } from '@/dto/shopper/shopper-login.req';
import { ShopperLoginRes } from '@/dto/shopper/shopper-login.res';
import { IRoleRepository } from '@/repository/interface/i.role.repository';
import { Role } from '@/models/role.model';
import { JwtClaimDto } from '@/dto/jwt-claim.dto';
import jwt from 'jsonwebtoken';
import { TIME_CONSTANTS } from '@/constants/time.constants';
import _ from 'lodash';
import { PagingResponseDto } from '@/dto/paging-response.dto';
import { PagingDto } from '@/dto/paging.dto';
import { IShoppingCartRepository } from '@/repository/interface/i.shopping_cart.repository';
import { ShopperValidateRegisterReq } from '@/dto/shopper/shopper-valiate-registr.req';

@injectable()
export class ShopperService extends BaseCrudService<Shopper> implements IShopperService<Shopper> {
  private shopperRepository: IShopperRepository<Shopper>;
  private roleRepository: IRoleRepository<Role>;
  private shoppingCartRepository: IShoppingCartRepository;

  constructor(
    @inject('ShopperRepository') shopperRepository: IShopperRepository<Shopper>,
    @inject('RoleRepository') roleRepository: IRoleRepository<Role>,
    @inject('ShoppingCartRepository') shoppingCartRepository: IShoppingCartRepository
  ) {
    super(shopperRepository);
    this.shopperRepository = shopperRepository;
    this.roleRepository = roleRepository;
    this.shoppingCartRepository = shoppingCartRepository;
  }

  /**
   * Check if email or phone number exists
   * @param data
   */
  async validationRegister(data: ShopperValidateRegisterReq): Promise<void> {
    if (
      await this.shopperRepository.exists({
        filter: {
          email: data.email
        }
      })
    ) {
      throw new BaseError(ErrorCode.DUPLICATE_DATA, 'Email already exists');
    }

    if (
      await this.shopperRepository.exists({
        filter: {
          phoneNumber: data.phoneNumber
        }
      })
    ) {
      throw new BaseError(ErrorCode.DUPLICATE_DATA, 'Phone number already exists');
    }
  }

  async login(data: ShopperLoginReq): Promise<ShopperLoginRes> {
    const { phoneNumberOrEmail, password } = data;
    const shopperWithPhone = await this.shopperRepository.findOne({
      filter: { phoneNumber: phoneNumberOrEmail }
    });
    const shopperWithEmail = await this.shopperRepository.findOne({
      filter: { email: phoneNumberOrEmail, emailVerified: true }
    });
    const shopperWithUsername = await this.shopperRepository.findOne({
      filter: { username: phoneNumberOrEmail }
    });

    if (!shopperWithPhone && !shopperWithEmail && !shopperWithUsername) {
      throw new BaseError(ErrorCode.NF_01, 'Shopper not found');
    }
    const shopper = shopperWithPhone || shopperWithEmail || shopperWithUsername;

    //Check if shopper is blocked or not
    if (shopper!.isBlocked) {
      throw new BaseError(ErrorCode.AUTH_01, 'Shopper is blocked');
    }

    if (!bcrypt.compareSync(password, shopper!.password)) {
      throw new BaseError(ErrorCode.AUTH_01, 'Password is incorrect');
    }

    const shopperRole = await this.roleRepository.findOne({
      filter: {
        name: RoleNameEnum.shopper
      }
    });

    const shopperPermissions = await shopperRole?.permissions;

    const shopperPermissionCodes = shopperPermissions!.map((permission) => permission.code) || [''];

    const jwtClaim = new JwtClaimDto(shopper!.id, shopper!.username, shopperPermissionCodes, shopperRole!.name);

    const secretKey = process.env.LOGIN_SECRET_KEY || '';

    const token = jwt.sign(_.toPlainObject(jwtClaim), secretKey, {
      expiresIn: TIME_CONSTANTS.DAY * 3,
      issuer: 'markey-backend'
    });

    return new ShopperLoginRes(token);
  }
  async register(data: ShopperRegisterReq): Promise<ShopperRes> {
    console.log('Registering shopper', data);

    if (
      await this.shopperRepository.exists({
        filter: {
          email: data.email
        }
      })
    ) {
      throw new BaseError(ErrorCode.DUPLICATE_DATA, 'Email already exists');
    }

    if (
      await this.shopperRepository.exists({
        filter: {
          phoneNumber: data.phoneNumber
        }
      })
    ) {
      throw new BaseError(ErrorCode.DUPLICATE_DATA, 'Phone number already exists');
    }

    if (
      await this.shopperRepository.exists({
        filter: {
          username: data.username
        }
      })
    ) {
      throw new BaseError(ErrorCode.DUPLICATE_DATA, 'Username already exists');
    }

    data.password = bcrypt.hashSync(data.password, 10);

    //Valid phone number or email
    await sendSmsForActivation(data.phoneNumber, data);

    const resultDto = convertToDto(ShopperRes, data);
    return resultDto;
  }

  async verifyEmailToken(email: string, token: string): Promise<void> {
    const shopper = await this.shopperRepository.findOne({
      filter: {
        email: email
      }
    });
    if (!shopper) {
      throw new BaseError(ErrorCode.ENTITY_NOT_FOUND, 'Shopper not found');
    }
    if (shopper.emailVerified) {
      throw new BaseError(ErrorCode.BAD_REQUEST, 'Email already verified');
    }
    const tokenInRedis = await redis.get(`${RedisSchemaEnum.activeShopperEmail}::${email}`);

    if (tokenInRedis !== token) {
      throw new BaseError(ErrorCode.INVALID_CODE, 'Invalid code');
    }

    shopper.emailVerified = true;

    await this.shopperRepository.findOneAndUpdate({
      filter: {
        email: email
      },
      updateData: shopper
    });

    return;
  }

  async activateEmail(shopperId: string, email: string): Promise<void> {
    const shopper = await this.shopperRepository.findOne({
      filter: {
        id: shopperId
      }
    });
    if (!shopper) {
      throw new BaseError(ErrorCode.ENTITY_NOT_FOUND, 'Shopper not found');
    }
    if (shopper.emailVerified) {
      throw new BaseError(ErrorCode.BAD_REQUEST, 'Email already verified');
    }
    await sendEmailForActivation(RedisSchemaEnum.activeShopperEmail, RoleNameEnum.shopper, email);
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

    const shopper = convertToDto(ShopperRegisterReq, tempUser);
    const createdShopper = await this.shopperRepository.create({
      data: shopper
    });

    //Call shopping service to create cart
    this.shoppingCartRepository.createCart({
      shopperId: createdShopper.id
    });

    return 'Activate phone number success, you can now login';
  }
}
