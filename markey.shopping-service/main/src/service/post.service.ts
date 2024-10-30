import { PagingResponseDto } from '@/dto/paging-response.dto';
import { PagingDto } from '@/dto/paging.dto';
import { CreatePostReq } from '@/dto/post/create-post.req';
import { PostListSelect } from '@/dto/post/post-lis.select';
import { SearchPostReq } from '@/dto/post/search-post.req';
import { ErrorCode } from '@/enums/error-code.enums';
import { Post } from '@/models/post.model';
import { Shop } from '@/models/shop.model';
import { IPostRepository } from '@/repository/interface/i.post.repository';
import { IShopRepository } from '@/repository/interface/i.shop.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IPostService } from '@/service/interface/i.post.service';
import { RecordOrderType } from '@/types/record-order.types';
import BaseError from '@/utils/error/base.error';
import { inject, injectable } from 'inversify';
import { Like } from 'typeorm';

@injectable()
export class PostService extends BaseCrudService<Post> implements IPostService<Post> {
  private postRepository: IPostRepository<Post>;
  private shopRepository: IShopRepository<Shop>;

  constructor(
    @inject('PostRepository') postRepository: IPostRepository<Post>,
    @inject('ShopRepository') shopRepository: IShopRepository<Shop>
  ) {
    super(postRepository);
    this.postRepository = postRepository;
    this.shopRepository = shopRepository;
  }
  async findWithFilter(filter: SearchPostReq, paging: PagingDto): Promise<PagingResponseDto<Post>> {
    let where = {};
    const sort: RecordOrderType[] = [];
    if (filter.sort) {
      sort.push({
        column: filter.sort.by,
        direction: filter.sort.order
      });
    }

    if (filter.shopId) {
      where = {
        ...where,
        shopId: filter.shopId
      };
    }

    if (filter.categoryId) {
      where = {
        ...where,
        categoryId: filter.categoryId
      };
    }

    if (filter.title) {
      where = {
        ...where,
        title: Like(`%${filter.title}%`)
      };
    }

    const posts = await this.postRepository.findMany({
      filter: where,
      paging: paging,
      order: sort,
      select: PostListSelect,
      relations: ['shop', 'category']
    });

    const totalRecords = await this.baseRepository.count({
      filter: where
    });
    return {
      items: posts,
      total: totalRecords
    };
  }

  async deletePostById(salesmanId: string, postId: string): Promise<void> {
    const shop = await this.shopRepository.findOne({
      filter: {
        salesmanId: salesmanId
      }
    });

    if (!shop) {
      throw new Error('Shop not found');
    }

    const post = await this.postRepository.findOne({
      filter: {
        id: postId
      }
    });

    if (!post) {
      return;
    }

    if (post?.shopId !== shop.id) {
      throw new BaseError(ErrorCode.VALIDATION_ERROR, 'Access denied');
    }

    await this.postRepository.findOneAndDelete({
      filter: {
        id: postId
      }
    });

    return;
  }

  async createWithSalesmanId(data: CreatePostReq, salesmanId: string, salesmanUsername: string): Promise<Post> {
    const shop = await this.shopRepository.findOne({
      filter: {
        salesmanId: salesmanId
      }
    });

    if (!shop) {
      throw new Error('Shop not found');
    }

    data.shopId = shop.id;
    data.createBy = salesmanUsername;

    return this.postRepository.create({
      data: data
    });
  }
}
