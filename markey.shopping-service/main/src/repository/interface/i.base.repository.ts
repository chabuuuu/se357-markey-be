import { PagingDto } from '@/dto/paging.dto';
import { DeleteResultType } from '@/types/delete-result.types';
import { RecordOrderType } from '@/types/record-order.types';
import { UpdateResultType } from '@/types/update-result.types';
import { Index } from 'lunr';
import { DeepPartial, FindOptionsSelect } from 'typeorm';

export interface IBaseRepository<T> {
  /**
   * Save a record
   * @param data
   * @returns The saved record
   */
  save(data: T): Promise<T>;

  /**
   * Create a new record with the given data
   * @param data
   * @returns The created record
   */
  simpleCreate(payload: { data: DeepPartial<T> }): Promise<T>;

  /**
   * Create a new record with the given data
   * @param data
   * @returns The created record
   */
  create(payload: { data: DeepPartial<T> }): Promise<T>;

  /**
   * Find a record by the given filter and delete it
   * @param filter
   * @returns The deleted record
   */
  findOneAndDelete(options: { filter: Partial<T> }): Promise<void>;

  /**
   * Find a record by the given filter and delete it
   * @param filter
   * @returns The deleted record
   */
  findOneAndHardDelete(options: { filter: Partial<T> }): Promise<void>;

  /**
   * Delete records by the given filter
   * @param filter
   * @returns The deleted record
   */
  hardDelete(options: { filter: Partial<T> }): Promise<void>;

  /**
   * Find a record by the given filter and update it
   * @param filter
   * @param updateData
   * @returns The updated success message
   */
  findOneAndUpdate(options: { filter: Partial<T>; updateData: Partial<T> }): Promise<void>;

  /**
   * Find a record by the given filter
   * @param filter
   * @returns The record with given filter
   */
  findOne(options: { filter: Partial<T>; relations?: string[]; select?: FindOptionsSelect<T> }): Promise<T | null>;

  /**
   * Find all records by the given filter
   * @param filter
   * @returns The records with given filter
   */
  findMany(options: {
    filter?: Partial<T>;
    paging?: PagingDto;
    order?: RecordOrderType[];
    relations?: string[];
    select?: FindOptionsSelect<T>;
  }): Promise<T[]>;

  /**
   * Find all records
   */
  findAll(): Promise<T[]>;

  /**
   * Count records by the given filter
   * @param filter
   * @returns The number of records with given filter
   */
  count(options: { filter?: Partial<T> }): Promise<number>;

  /**
   * Count records by the given filter
   * @param filter
   * @returns The number of records with given filter
   */
  countWithSearchIndex(options: { filter?: Partial<T>; index?: Index; searchKey: string }): Promise<number>;

  /**
   * Check if a record exists with the given filter
   * @param filter
   */
  exists(options: { filter: Partial<T> }): Promise<boolean>;
}
