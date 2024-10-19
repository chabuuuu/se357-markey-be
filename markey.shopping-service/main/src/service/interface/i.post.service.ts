import { CreatePostReq } from '@/dto/post/create-post.req';
import { Post } from '@/models/post.model';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface IPostService<T extends BaseModelType> extends IBaseCrudService<T> {
  deletePostById(salesmanId: string, postId: string): Promise<void>;
  createWithSalesmanId(data: CreatePostReq, salesmanId: string, salesmanUsername: string): Promise<Post>;
}
