import { LoginTypeEnum } from '@/enums/login-type.enum';
import { BaseEntity } from '@/models/base-model.model';
import { Shop } from '@/models/shop.model';
import { AfterLoad, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('salesmans')
export class Salesman extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

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

  @Column({
    type: 'boolean',
    default: false,
    nullable: false,
    name: 'email_verified'
  })
  emailVerified!: boolean;

  @Column({
    type: 'varchar',
    length: 70,
    nullable: false
  })
  cccd!: string;

  @Column({
    type: 'text',
    nullable: true,
    transformer: {
      to: (value: any) => {
        //if  value is array
        if (Array.isArray(value)) {
          return value.join(',');
        }
        return value;
      },
      from: (value: string) => {
        console.log('value', value.split(','));

        if (!value) {
          return [];
        }
        return value.split(',');
      }
    }
  })
  attachments!: string;

  @Column({
    type: 'boolean',
    default: false,
    nullable: false,
    name: 'is_approved'
  })
  isApproved!: boolean;

  //fks
  @OneToOne(() => Shop, (shop) => shop.salesman, { cascade: true })
  shop!: Shop;
}
