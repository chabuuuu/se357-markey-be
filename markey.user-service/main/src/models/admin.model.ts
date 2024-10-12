import { BaseEntity } from '@/models/base-model.model';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admins')
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false
  })
  username!: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false
  })
  password!: string;

  @Column({
    type: 'varchar',
    length: 70,
    nullable: false
  })
  cccd!: string;

  @Column({
    type: 'text',
    nullable: true,
    name: 'profile_picture'
  })
  profilePicture!: string;

  @Column({
    type: 'varchar',
    length: 70,
    nullable: false
  })
  fullname!: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false
  })
  address!: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
    name: 'phone_number'
  })
  phoneNumber!: string;

  @Column()
  birthdate!: Date;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false
  })
  email!: string;
}
