import { PostCategoryEnum } from '@/enums/post-category.enum';
import { PostLangTypeEnum } from '@/enums/post-lang-type.enum';
import { Account } from '@/models/account.model';
import { BaseEntity } from '@/models/base_model.model';
import { Category } from '@/models/category.model';
import { Shop } from '@/models/shop.model';
import { Entity, PrimaryGeneratedColumn, Index, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity('posts')
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: true })
  title?: string;

  @Column({
    type: 'text',
    nullable: true
  })
  thumbnail?: string;

  @Column({ name: 'category_id' })
  categoryId!: string;

  @ManyToOne(() => Category, (category) => category.posts)
  @JoinColumn({ name: 'category_id' })
  category!: Category;

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
