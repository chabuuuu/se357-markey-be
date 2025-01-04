import { Recommend } from '@/models/recommend.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { IRecommendRepository } from '@/repository/interface/i.recommend.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class RecommendRepository extends BaseRepository<Recommend> implements IRecommendRepository<Recommend> {
constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
super(dataSource.getRepository(Recommend));
}
}