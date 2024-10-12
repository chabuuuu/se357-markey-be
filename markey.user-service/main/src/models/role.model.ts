import { RoleNameEnum } from '@/enums/role-name.enum';
import { BaseEntity } from '@/models/base-model.model';
import { Permission } from '@/models/permission.model';
import { injectable } from 'inversify';
import { Column, Entity, Index, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

@injectable()
@Entity('roles')
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index({ unique: true })
  @Column({
    type: 'enum',
    enum: RoleNameEnum,
    default: RoleNameEnum.shopper
  })
  name!: string;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'roles_permissions',
    joinColumn: { name: 'role_id' },
    inverseJoinColumn: { name: 'permission_id' }
  })
  permissions!: Promise<Permission[]>;
}
