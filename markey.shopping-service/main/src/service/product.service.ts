import { searchService } from '@/container/search.container';
import { JwtClaimDto } from '@/dto/jwt-claim.dto';
import { PagingResponseDto } from '@/dto/paging-response.dto';
import { PagingDto } from '@/dto/paging.dto';
import { CreateProductReq } from '@/dto/product/create-product.req';
import { FindProductReq } from '@/dto/product/find-product.req';
import { ListProductSelect } from '@/dto/product/list-product.select';
import { ErrorCode } from '@/enums/error-code.enums';
import { Product } from '@/models/product.model';
import { Recommend } from '@/models/recommend.model';
import { Shop } from '@/models/shop.model';
import { IProductRepository } from '@/repository/interface/i.product.repository';
import { IRecommendRepository } from '@/repository/interface/i.recommend.repository';
import { IShopRepository } from '@/repository/interface/i.shop.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IProductService } from '@/service/interface/i.product.service';
import { ISearchService } from '@/service/interface/i.search.service';
import { RecordOrderType } from '@/types/record-order.types';
import BaseError from '@/utils/error/base.error';
import { normalizeTextUtil } from '@/utils/normalize-text.util';
import { inject, injectable } from 'inversify';
import { And, IsNull, LessThanOrEqual, Like, MoreThanOrEqual, Not } from 'typeorm';

@injectable()
export class ProductService extends BaseCrudService<Product> implements IProductService<Product> {
  private productRepository: IProductRepository<Product>;
  private shopRepository: IShopRepository<Shop>;
  private recommendRepository: IRecommendRepository<Recommend>;

  constructor(
    @inject('ProductRepository') productRepository: IProductRepository<Product>,
    @inject('ShopRepository') shopRepository: IShopRepository<Shop>,
    @inject('RecommendRepository') recommendRepository: IRecommendRepository<Recommend>
  ) {
    super(productRepository);
    this.productRepository = productRepository;
    this.shopRepository = shopRepository;
    this.recommendRepository = recommendRepository;
  }

  async getRecommendProducts(paging: PagingDto, user?: JwtClaimDto): Promise<PagingResponseDto<Product>> {
    //Check if there is any recommend product
    console.log('user', user);

    if (user) {
      const recommend = await this.recommendRepository.findOne({
        filter: {
          userId: user.id
        }
      });

      if (recommend && recommend.products) {
        const result = [];
        for (const productId of recommend.products) {
          const product = await this.productRepository.findOne({
            filter: {
              id: productId
            },
            relations: ['category', 'shop'],
            select: ListProductSelect
          });
          if (product) {
            result.push(product);
          }
        }
        return {
          items: result,
          total: result.length
        };
      }
    }

    const result = await this.productRepository.findMany({
      paging: paging,
      relations: ['category', 'shop'],
      filter: {
        ratingAverage: Not(IsNull()) as any
      },
      select: ListProductSelect,
      order: [
        {
          column: 'ratingAverage',
          direction: 'DESC'
        }
      ]
    });

    const totalRecords = await this.productRepository.count({
      filter: {
        ratingAverage: Not(IsNull()) as any
      }
    });
    const resultWithPaging = {
      items: result,
      total: totalRecords
    };

    return resultWithPaging;
  }

  async canDeleteOrNot(user: JwtClaimDto, productId: string): Promise<void> {
    if (user.roleName !== 'salesman') {
      throw new BaseError(ErrorCode.AUTH_01, 'You are not allowed to delete product');
    }
    const product = await this.productRepository.findOne({ filter: { id: productId } });
    if (!product) {
      throw new BaseError(ErrorCode.NF_01, 'Product not found');
    }
    if (product.shopId !== user.shopId) {
      throw new BaseError(ErrorCode.AUTH_01, 'You are not allowed to delete product');
    }
  }

  async findWithFilter(filter: FindProductReq, paging: PagingDto): Promise<PagingResponseDto<Product>> {
    let where = {};
    const sort: RecordOrderType[] = [];

    if (filter.aboveRating) {
      where = {
        ...where,
        ratingAverage: MoreThanOrEqual(filter.aboveRating)
      };
    }

    if (filter.shopId) {
      where = {
        ...where,
        shopId: filter.shopId
      };
    }

    if (filter.priceFrom && !filter.priceTo) {
      where = {
        ...where,
        price: MoreThanOrEqual(filter.priceFrom)
      };
    }

    if (!filter.priceFrom && filter.priceTo) {
      where = {
        ...where,
        price: LessThanOrEqual(filter.priceTo)
      };
    }

    if (filter.priceFrom && filter.priceTo) {
      where = {
        ...where,
        price: And(MoreThanOrEqual(filter.priceFrom), LessThanOrEqual(filter.priceTo))
      };
    }

    if (filter.categoryId) {
      where = {
        ...where,
        categoryId: filter.categoryId
      };
    }

    if (filter.sort) {
      sort.push({
        column: filter.sort.by,
        direction: filter.sort.order
      });
    }

    if (filter.name) {
      where = {
        ...where,
        nameForSearch: Like(`%${normalizeTextUtil(filter.name)}%`)
      };
    }

    const products = await this.productRepository.findMany({
      filter: where,
      paging: paging,
      order: sort,
      select: ListProductSelect,
      relations: ['category', 'shop']
    });

    const totalRecords = await this.productRepository.count({
      filter: where
    });

    return {
      items: products,
      total: totalRecords
    };
  }

  async createWithSalesmanId(data: CreateProductReq, salesmanId: string): Promise<Product> {
    const shop = await this.shopRepository.findOne({
      filter: {
        salesmanId: salesmanId
      }
    });
    if (!shop) {
      throw new BaseError(ErrorCode.NF_01, 'Shop not found with given salesmanId: ' + salesmanId);
    }

    //Check if the shop is owned by the salesman
    if (shop.salesmanId !== salesmanId) {
      throw new BaseError(ErrorCode.PERMISSION_01, 'You are not the owner of this shop');
    }

    (data as unknown as Product).nameForSearch = normalizeTextUtil(data.name);

    const product = await this.productRepository.create({
      data: {
        ...data,
        shopId: shop.id
      }
    });

    return product;
  }
}
