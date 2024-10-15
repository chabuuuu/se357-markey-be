import { BaseCrudController } from '@/controller/base/base-crud.controller';
import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { BaseRepository } from '@/repository/base/base.repository';
import { IBaseRepository } from '@/repository/interface/i.base.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { ITYPES } from '@/types/interface.types';
import { Container } from 'inversify';
import { Model } from 'mongoose';

export class BaseContainer {
  protected container!: Container;
  protected baseController!: IBaseCrudController<any>;
  protected model: any;
  constructor(model: any) {
    this.container = new Container();

    this.container.bind<Model<any>>(ITYPES.OrmRepository).toConstantValue(model);

    this.container.bind<IBaseRepository<any>>(ITYPES.Repository).to(BaseRepository<any>);

    this.container.bind<IBaseCrudService<any>>(ITYPES.Service).to(BaseCrudService<any>);

    this.container.bind<IBaseCrudController<any>>(ITYPES.Controller).to(BaseCrudController<any>);
  }
}
