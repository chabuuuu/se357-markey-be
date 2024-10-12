import { BaseEntity } from '@/models/base-model.model';
import { Salesman } from '@/models/salesman.model';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('shops')
@Unique(['name'])
export class Shop extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    length: 70,
    nullable: false
  })
  name!: string;

  @Column({
    type: 'text',
    nullable: true,
    name: 'profile_picture'
  })
  profilePicture!: string;

  @Column({
    type: 'text',
    nullable: true
  })
  description!: string;

  //fks
  @Column({
    name: 'salesman_id'
  })
  salesmanId!: string;

  @OneToOne(() => Salesman, (salesman) => salesman.shop)
  @JoinColumn({ name: 'salesman_id' })
  salesman!: Salesman;
}
