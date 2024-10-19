import { Post } from '@/models/post.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { IPostRepository } from '@/repository/interface/i.post.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class PostRepository extends BaseRepository<Post> implements IPostRepository<Post> {
constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
super(dataSource.getRepository(Post));
}
}