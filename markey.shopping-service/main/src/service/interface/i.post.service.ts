import { PagingResponseDto } from '@/dto/paging-response.dto';
import { PagingDto } from '@/dto/paging.dto';
import { CreatePostReq } from '@/dto/post/create-post.req';
import { SearchPostReq } from '@/dto/post/search-post.req';
import { Post } from '@/models/post.model';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface IPostService<T extends BaseModelType> extends IBaseCrudService<T> {
  findWithFilter(filter: SearchPostReq, paging: PagingDto): Promise<PagingResponseDto<Post>>;
  deletePostById(salesmanId: string, postId: string): Promise<void>;
  createWithSalesmanId(data: CreatePostReq, salesmanId: string, salesmanUsername: string): Promise<Post>;
}
