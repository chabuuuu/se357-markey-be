import moment from 'moment-timezone';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @CreateDateColumn({
    name: 'create_at',
    transformer: {
      to: (value: Date) => value,
      from: (value: string) => {
        if (!value) {
          return value;
        }
        const raw = moment(value);
        const vn = raw.clone().tz('Asia/Ho_Chi_Minh');
        return vn.format('YYYY-MM-DD HH:mm:ss');
      }
    }
  })
  createAt!: Date;

  @UpdateDateColumn({
    name: 'update_at',
    transformer: {
      to: (value: Date) => value,
      from: (value: string) => {
        if (!value) {
          return value;
        }
        const raw = moment(value);
        const vn = raw.clone().tz('Asia/Ho_Chi_Minh');
        return vn.format('YYYY-MM-DD HH:mm:ss');
      }
    }
  })
  updateAt!: Date;

  @Column({ nullable: true, name: 'create_by' })
  createBy!: string;

  @Column({ nullable: true, name: 'update_by' })
  updateBy!: string;

  @Column({
    nullable: true,
    name: 'delete_at',
    transformer: {
      to: (value: Date) => value,
      from: (value: string) => {
        if (!value) {
          return value;
        }
        const raw = moment(value);
        const vn = raw.clone().tz('Asia/Ho_Chi_Minh');
        return vn.format('YYYY-MM-DD HH:mm:ss');
      }
    }
  })
  deleteAt!: Date;
}
