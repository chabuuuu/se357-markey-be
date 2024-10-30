import { BaseEntity } from '@/models/base_model.model';
import { Post } from '@/models/post.model';
import { Product } from '@/models/product.model';
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false
  })
  name!: string;

  @Column({
    type: 'text'
  })
  picture?: string;

  @OneToMany(() => Product, (product) => product.category)
  products!: Promise<Product[]>;

  @OneToMany(() => Post, (post) => post.category)
  posts!: Promise<Post[]>;
}
