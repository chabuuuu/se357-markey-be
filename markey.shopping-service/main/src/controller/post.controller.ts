import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { JwtClaimDto } from '@/dto/jwt-claim.dto';
import { PagingDto } from '@/dto/paging.dto';
import { PostListSelect } from '@/dto/post/post-lis.select';
import { ErrorCode } from '@/enums/error-code.enums';
import { RoleNameEnum } from '@/enums/role-name.enum';
import { Post } from '@/models/post.model';
import { IPostService } from '@/service/interface/i.post.service';
import { ITYPES } from '@/types/interface.types';
import BaseError from '@/utils/error/base.error';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class PostController {
  public common: IBaseCrudController<Post>;
  private postService: IPostService<Post>;
  constructor(
    @inject('PostService') postService: IPostService<Post>,
    @inject(ITYPES.Controller) common: IBaseCrudController<Post>
  ) {
    this.postService = postService;
    this.common = common;
  }
  getSalesmanCurrentlyLoggedIn(req: Request): JwtClaimDto {
    const user = req.user;
    if (user?.roleName !== RoleNameEnum.salesman) {
      throw new BaseError(ErrorCode.PERMISSION_01, 'Chỉ người dùng có quyền salesman mới có quyền này');
    }
    if (!user.id) {
      throw new BaseError(ErrorCode.VALIDATION_ERROR, 'Không tìm thấy thông tin người dùng');
    }

    return user;
  }

  /**
   * * POST /post/
   */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      const salesman = this.getSalesmanCurrentlyLoggedIn(req);

      const salesmanId = salesman.id;

      const salesmanUsername = salesman.username;

      const result = await this.postService.createWithSalesmanId(data, salesmanId, salesmanUsername);

      return res.send_ok('Created successfully', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /post/by-shop/:shopId
   */
  async getByShop(req: Request, res: Response, next: NextFunction) {
    try {
      const shopId = req.params.shopId;

      const result = await this.postService.findMany({
        filter: {
          shopId: shopId
        },
        select: PostListSelect,
        relations: ['shop']
      });

      return res.send_ok('Get successfully', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /post/by-shop/paging/:shopId
   */
  async getByShopPaging(req: Request, res: Response, next: NextFunction) {
    try {
      const shopId = req.params.shopId;
      const { page, rpp } = req.query;
      const paging = new PagingDto(Number(page), Number(rpp));

      const result = await this.postService.findWithPaging({
        filter: {
          shopId: shopId
        },
        select: PostListSelect,
        paging: paging,
        relations: ['shop']
      });

      return res.send_ok('Get successfully', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /post/:id
   * @param req
   * @param res
   * @param next
   */
  async getPostDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;

      const result = await this.postService.findOne({
        filter: { id: id },
        relations: ['shop']
      });

      return res.send_ok('Found successfully', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /post/
   */
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.postService.findMany({
        select: PostListSelect
      });

      return res.send_ok('Found successfully', result!);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * DELETE /post/:id
   */
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const postId = req.params.id;

      const salesman = this.getSalesmanCurrentlyLoggedIn(req);
      const salesmanId = salesman.id;

      await this.postService.deletePostById(salesmanId, postId);

      return res.send_ok('Deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}
