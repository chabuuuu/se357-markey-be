import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { Recommend } from '@/models/recommend.model';
import { IRecommendService } from '@/service/interface/i.recommend.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class RecommendController {
public common: IBaseCrudController<Recommend>;
private recommendService: IRecommendService<Recommend>;
constructor(
@inject('RecommendService') recommendService: IRecommendService<Recommend>,
@inject(ITYPES.Controller) common: IBaseCrudController<Recommend>
) {
this.recommendService = recommendService;
this.common = common;
}
}