import * as dotenv from 'dotenv';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
dotenv.config();

export const dbConfig: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [__dirname + '/entities/*.{js,ts}'],
  migrations: [__dirname + '/migrations/*.{js,ts}'],
  namingStrategy: new SnakeNamingStrategy(),
  logging: true,
  synchronize: process.env.NODE_ENV === 'development',
};

const dataSource = new DataSource(dbConfig);

export default dataSource;
