import { UpdateShopReq } from '@/dto/shop/update-shop.req';
import { ErrorCode } from '@/enums/error-code.enums';
import { Shop } from '@/models/shop.model';
import { IShopRepository } from '@/repository/interface/i.shop.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IShopService } from '@/service/interface/i.shop.service';
import BaseError from '@/utils/error/base.error';
import { inject, injectable } from 'inversify';

@injectable()
export class ShopService extends BaseCrudService<Shop> implements IShopService<Shop> {
  private shopRepository: IShopRepository<Shop>;

  constructor(@inject('ShopRepository') shopRepository: IShopRepository<Shop>) {
    super(shopRepository);
    this.shopRepository = shopRepository;
  }

  /**
   * * Update shop by salesman
   * @param shopId
   * @param salesmanId
   * @param updateData
   * @returns
   */
  async salesmanUpdateShop(shopId: string, salesmanId: string, updateData: UpdateShopReq): Promise<void> {
    const shop = await this.shopRepository.findOne({
      filter: {
        id: shopId
      }
    });
    if (!shop) {
      throw new BaseError(ErrorCode.NF_01, 'Shop not found');
    }

    if (shop.salesmanId !== salesmanId) {
      throw new BaseError(
        ErrorCode.PERMISSION_01,
        'You do not have permission to update this shop because you are not the owner'
      );
    }

    await this.shopRepository.findOneAndUpdate({
      filter: {
        id: shopId
      },
      updateData: updateData
    });

    return;
  }
}
