import { Salesman } from '@/models/salesman.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { ISalesmanRepository } from '@/repository/interface/i.salesman.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class SalesmanRepository extends BaseRepository<Salesman> implements ISalesmanRepository<Salesman> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Salesman));
  }
}
