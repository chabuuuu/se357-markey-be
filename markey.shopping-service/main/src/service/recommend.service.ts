import { Recommend } from '@/models/recommend.model';
import { IRecommendRepository } from '@/repository/interface/i.recommend.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IRecommendService } from '@/service/interface/i.recommend.service';
import { inject, injectable } from 'inversify';

@injectable()
export class RecommendService extends BaseCrudService<Recommend> implements IRecommendService<Recommend> {
private recommendRepository: IRecommendRepository<Recommend>;

constructor(@inject('RecommendRepository') recommendRepository: IRecommendRepository<Recommend>) {
super(recommendRepository);
this.recommendRepository = recommendRepository;
}
}