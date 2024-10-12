import { BaseEntity } from '@/models/base-model.model';
import { injectable } from 'inversify';
import { Entity, PrimaryGeneratedColumn, Index, Column } from 'typeorm';

@injectable()
@Entity('permissions')
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index({ unique: true })
  @Column({ nullable: false })
  code!: string;

  @Column({
    type: 'text',
    nullable: true
  })
  description!: string;
}
