import { PostController } from '@/controller/post.controller';
import { PostService } from '@/service/post.service';
import { Post } from '@/models/post.model';
import { PostRepository } from '@/repository/post.repository';
import { IPostService } from '@/service/interface/i.post.service';
import { IPostRepository } from '@/repository/interface/i.post.repository';
import { BaseContainer } from '@/container/base.container';
import { IShopRepository } from '@/repository/interface/i.shop.repository';
import { shopRepository } from '@/container/shop.container';

class PostContainer extends BaseContainer {
  constructor() {
    super(Post);
    this.container.bind<IPostService<Post>>('PostService').to(PostService);
    this.container.bind<IPostRepository<Post>>('PostRepository').to(PostRepository);
    this.container.bind<PostController>(PostController).toSelf();

    //Import
    this.container.bind<IShopRepository<any>>('ShopRepository').toConstantValue(shopRepository);
  }

  export() {
    const postController = this.container.get<PostController>(PostController);
    const postService = this.container.get<IPostService<any>>('PostService');
    return { postController, postService };
  }
}

const postContainer = new PostContainer();
const { postController, postService } = postContainer.export();
export { postController, postService };
