import { MessageResponseDto } from '@/dto/message-response.dto';
import { UpdateShopReq } from '@/dto/shop/update-shop.req';
import { ErrorCode } from '@/enums/error-code.enums';
import { IShop } from '@/models/shop.model';
import { IShopRepository } from '@/repository/interface/i.shop.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IShopService } from '@/service/interface/i.shop.service';
import BaseError from '@/utils/error/base.error';
import { inject, injectable } from 'inversify';
import { ObjectId } from 'mongodb';

@injectable()
export class ShopService extends BaseCrudService<IShop> implements IShopService<IShop> {
  private shopRepository: IShopRepository<IShop>;

  constructor(@inject('ShopRepository') shopRepository: IShopRepository<IShop>) {
    super(shopRepository);
    this.shopRepository = shopRepository;
  }

  /**
   * * Update shop owned by salesman
   * @param shopId
   * @param salesmanId
   * @param updateData
   */
  async salesmanUpdateShop(shopId: string, salesmanId: string, updateData: UpdateShopReq): Promise<MessageResponseDto> {
    const shop = await this.shopRepository.findOne({
      filter: {
        id: shopId
      }
    });
    if (!shop) {
      throw new Error('Shop not found');
    }
    if (shop.salesmanId !== salesmanId) {
      throw new BaseError(ErrorCode.PERMISSION_01, 'You do not have permission to update this shop');
    }

    await this.shopRepository.findOneAndUpdate({
      filter: {
        id: shopId
      },
      updateData: updateData
    });
    return { message: 'Shop updated' };
  }
}
