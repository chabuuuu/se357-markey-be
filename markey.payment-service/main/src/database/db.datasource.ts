import 'dotenv/config';
import 'reflect-metadata';
import { BaseEntity, DataSource } from 'typeorm';
import { GlobalConfig } from '@/utils/config/global-config.util';
import { Payment } from '@/models/payment.model';

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
        entities: [Payment, BaseEntity],
        synchronize: GlobalConfig.database.sync,
        logging: true,
        migrations: [__dirname + '/migrations/*.js']
      });
    }
    return AppDataSourceSingleton.instance;
  }
}

export const AppDataSource = AppDataSourceSingleton.getInstance();