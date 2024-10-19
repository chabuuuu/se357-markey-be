import 'dotenv/config';
import { Account } from '../models/account.model';
import { Role } from '../models/role.model';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { BaseEntity } from '@/models/base_model.model';
import { CartItem } from '@/models/cart_item.model';
import { Category } from '@/models/category.model';
import { Product } from '@/models/product.model';
import { ShoppingCart } from '@/models/shopping_cart.model';
import { Shop } from '@/models/shop.model';
import { GlobalConfig } from '@/utils/config/global-config.util';
import { ProductRating } from '@/models/product_rating.model';
import { Post } from '@/models/post.model';

const models = [Post, ProductRating, BaseEntity, CartItem, Category, Product, ShoppingCart, Shop];
export class AppDataSourceSingleton {
  private static instance: DataSource;

  private constructor() {}

  public static getInstance(): DataSource {
    if (!AppDataSourceSingleton.instance) {
      AppDataSourceSingleton.instance = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 5432,
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'admin',
        database: process.env.DB_NAME || 'test',
        entities: models,
        synchronize: GlobalConfig.database.sync,
        logging: true,
        migrations: [__dirname + '/migrations/*.js']
      });
    }
    return AppDataSourceSingleton.instance;
  }
}

export const AppDataSource = AppDataSourceSingleton.getInstance();
