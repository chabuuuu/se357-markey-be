import { RecommendController } from '@/controller/recommend.controller';
import { RecommendService } from '@/service/recommend.service';
import { Recommend } from '@/models/recommend.model';
import { RecommendRepository } from '@/repository/recommend.repository';
import { IRecommendService } from '@/service/interface/i.recommend.service';
import { IRecommendRepository } from '@/repository/interface/i.recommend.repository';
import { BaseContainer } from '@/container/base.container';

class RecommendContainer extends BaseContainer {
  constructor() {
    super(Recommend);
    this.container.bind<IRecommendService<Recommend>>('RecommendService').to(RecommendService);
    this.container.bind<IRecommendRepository<Recommend>>('RecommendRepository').to(RecommendRepository);
    this.container.bind<RecommendController>(RecommendController).toSelf();
  }

  export() {
    const recommendController = this.container.get<RecommendController>(RecommendController);
    const recommendService = this.container.get<IRecommendService<any>>('RecommendService');
    const recommendRepository = this.container.get<IRecommendRepository<any>>('RecommendRepository');
    return { recommendController, recommendService, recommendRepository };
  }
}

const recommendContainer = new RecommendContainer();
const { recommendController, recommendService, recommendRepository } = recommendContainer.export();
export { recommendController, recommendService, recommendRepository };
