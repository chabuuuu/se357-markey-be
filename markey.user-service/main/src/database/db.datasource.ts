import 'dotenv/config';
import { Role } from '../models/role.model';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { BaseEntity } from '@/models/base-model.model';
import { Permission } from '@/models/permission.model';
import { Admin } from '@/models/admin.model';
import { Salesman } from '@/models/salesman.model';
import { Shop } from '@/models/shop.model';
import { Shopper } from '@/models/shopper.model';
import { GlobalConfig } from '@/utils/config/global-config.util';

const models = [Role, BaseEntity, Permission, Admin, Salesman, Shop, Shopper];

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
