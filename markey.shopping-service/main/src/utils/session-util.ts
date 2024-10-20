import { JwtClaimDto } from '@/dto/jwt-claim.dto';
import { ErrorCode } from '@/enums/error-code.enums';
import { RoleNameEnum } from '@/enums/role-name.enum';
import BaseError from '@/utils/error/base.error';
import { Request } from 'express';

export class SessionUtil {
  public static getSalesmanCurrentlyLoggedIn(req: Request): JwtClaimDto {
    const user = req.user;
    if (user?.roleName !== RoleNameEnum.salesman) {
      throw new BaseError(ErrorCode.PERMISSION_01, 'Chỉ người dùng có quyền salesman mới có quyền này');
    }
    if (!user.id) {
      throw new BaseError(ErrorCode.VALIDATION_ERROR, 'Không tìm thấy thông tin người dùng');
    }

    return user;
  }

  public static getShopperCurrentlyLoggedIn(req: Request): JwtClaimDto {
    const user = req.user;
    if (user?.roleName !== RoleNameEnum.shopper) {
      throw new BaseError(
        ErrorCode.PERMISSION_01,
        'Chỉ người dùng có quyền shopper mới có thể thêm sản phẩm vào giỏ hàng'
      );
    }
    if (!user.id) {
      throw new BaseError(ErrorCode.VALIDATION_ERROR, 'Không tìm thấy thông tin người dùng');
    }

    return user;
  }
}
