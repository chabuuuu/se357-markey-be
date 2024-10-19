import { PostCategoryEnum } from '@/enums/post-category.enum';
import { PostLangTypeEnum } from '@/enums/post-lang-type.enum';
import { Account } from '@/models/account.model';
import { BaseEntity } from '@/models/base_model.model';
import { Shop } from '@/models/shop.model';
import { Entity, PrimaryGeneratedColumn, Index, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity('posts')
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'text',
    nullable: true
  })
  thumbnail?: string;

  @Column({
    type: 'enum',
    enum: PostCategoryEnum,
    default: PostCategoryEnum.OTHER
  })
  category!: string;

  @Column({
    type: 'text',
    array: true,
    nullable: true
  })
  tags?: string[];

  @Column({
    type: 'text',
    nullable: false
  })
  content!: string;

  @Column({
    type: 'enum',
    enum: PostLangTypeEnum,
    default: PostLangTypeEnum.VN
  })
  lang_type!: string;

  @Column({
    name: 'shop_id'
  })
  shopId!: string;

  @ManyToOne(() => Shop, (shop) => shop.posts)
  @JoinColumn({ name: 'shop_id' })
  shop!: Shop;
}
