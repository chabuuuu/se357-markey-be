import { CreatePostReq } from '@/dto/post/create-post.req';
import { ErrorCode } from '@/enums/error-code.enums';
import { Post } from '@/models/post.model';
import { Shop } from '@/models/shop.model';
import { IPostRepository } from '@/repository/interface/i.post.repository';
import { IShopRepository } from '@/repository/interface/i.shop.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IPostService } from '@/service/interface/i.post.service';
import BaseError from '@/utils/error/base.error';
import { inject, injectable } from 'inversify';

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
