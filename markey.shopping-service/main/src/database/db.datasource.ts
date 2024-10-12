import 'dotenv/config';
import 'reflect-metadata';
import mongoose, { Mongoose } from 'mongoose';

const mongoConnectString = process.env.MONGO_CONNECT_STRING || 'mongodb://127.0.0.1:27017/test';

export class AppDataSourceSingleton {
  private static instance: Mongoose;

  private constructor() {}

  public static async getInstance(): Promise<Mongoose> {
    if (!AppDataSourceSingleton.instance) {
      AppDataSourceSingleton.instance = await mongoose.connect(mongoConnectString);
    }
    return AppDataSourceSingleton.instance;
  }
}

export const AppDataSource = AppDataSourceSingleton.getInstance();
