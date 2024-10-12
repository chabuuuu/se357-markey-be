import { PagingDto } from '@/dto/paging.dto';
import { ErrorCode } from '@/enums/error-code.enums';
import { IBaseRepository } from '@/repository/interface/i.base.repository';
import { DeleteResultType } from '@/types/delete-result.types';
import { ITYPES } from '@/types/interface.types';
import { RecordOrderType } from '@/types/record-order.types';
import { UpdateResultType } from '@/types/update-result.types';
import BaseError from '@/utils/error/base.error';
import { inject, injectable } from 'inversify';
import { Model } from 'mongoose';
import 'reflect-metadata';

@injectable()
export class BaseRepository<T> implements IBaseRepository<T> {
  protected ormRepository!: Model<T>;

  constructor(
    @inject(ITYPES.OrmRepository)
    ormRepository: Model<T>
  ) {
    this.ormRepository = ormRepository;
  }

  async create(payload: { data: Partial<T> }): Promise<T> {
    const data = payload.data;
    const result = await this.ormRepository.create(data);
    return result;
  }

  async findOneAndDelete(options: { filter: Partial<T> }): Promise<void> {
    const { filter } = options;
    const recordToDelete = await this.ormRepository.findOne(filter);
    if (!recordToDelete) {
      throw new BaseError(ErrorCode.NF_01, 'Record not found with given filter: ' + JSON.stringify(filter));
    }
    (recordToDelete as any).deleteAt = new Date();
    await recordToDelete.save();
  }

  async findOneAndUpdate(options: { filter: Partial<T>; updateData: Partial<T> }): Promise<void> {
    const { filter, updateData } = options;

    if (filter && !(filter as any).deleteAt) {
      (filter as any).deleteAt = null;
    }

    const recordToUpdate = await this.ormRepository.findOne(filter);

    if (!recordToUpdate) {
      throw new BaseError(ErrorCode.NF_01, 'Record not found with given filter: ' + JSON.stringify(filter));
    }
    await this.ormRepository.updateOne(filter, updateData);
  }

  async findOne(options: { filter: Partial<T>; relations?: string[]; select?: string[] }): Promise<T | null> {
    const { filter, relations, select } = options;

    if (!(filter as unknown as any).deleteAt) {
      (filter as any).deleteAt = null;
    }
    let result = null;

    let selectInString = undefined;

    if (select) {
      select.push('-_id');
      selectInString = select.join(' ');
    } else {
      selectInString = '-_id';
    }

    if (relations) {
      result = await this.ormRepository.findOne(filter, selectInString).populate(relations);
    } else {
      result = await this.ormRepository.findOne(filter, selectInString);
    }

    if (!result) {
      throw new BaseError(ErrorCode.NF_01, 'Record not found with given filter: ' + JSON.stringify(filter));
    }
    return result;
  }

  async findMany(options: {
    filter?: Partial<T>;
    paging?: PagingDto;
    order?: RecordOrderType[];
    relations?: string[];
    select?: string[];
  }): Promise<T[]> {
    const { paging, order, relations, select } = options;
    let { filter } = options;

    let skip = undefined;
    let take = undefined;
    if (paging) {
      skip = (paging.page - 1) * paging.page;
      take = paging.rpp;
    }

    if (filter && !(filter as unknown as any).deleteAt) {
      (filter as any).deleteAt = null;
    }

    if (!filter) {
      (filter as any) = {
        deleteAt: null
      };
    }

    const orderObject: Record<string, 'asc' | 'desc'> = {};
    if (order) {
      order.forEach((o) => {
        orderObject[o.column] = o.direction;
      });
    }

    let selectInString = undefined;

    if (select) {
      select.push('-_id');
      selectInString = select.join(' ');
    } else {
      selectInString = '-_id';
    }

    const result = await this.ormRepository.find(filter as any, selectInString, {
      skip: skip,
      take: take,
      sort: orderObject,
      populate: relations
    });
    return result;
  }

  async findAll(): Promise<T[]> {
    const selectInString = '-_id';
    const filter: Partial<T> = {};
    (filter as any).deleteAt = null;

    return await this.ormRepository.find(filter, selectInString);
  }

  async count(options: { filter?: Partial<T> }): Promise<number> {
    const { filter } = options;

    if (filter && !(filter as unknown as any).deleteAt) {
      (filter as any).deleteAt = null;
    }

    if (!filter) {
      (filter as any) = {
        deleteAt: null
      };
    }

    console.log('count filter', filter);

    return await this.ormRepository.countDocuments(filter);
  }

  async exists(options: { filter: Partial<T> }): Promise<boolean> {
    const { filter } = options;

    if (filter && !(filter as unknown as any).deleteAt) {
      (filter as any).deleteAt = null;
    }

    const total = await this.ormRepository.countDocuments({
      where: filter
    });
    return total > 0;
  }
}
