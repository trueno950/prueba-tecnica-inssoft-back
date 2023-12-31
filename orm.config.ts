import { DataSourceOptions } from 'typeorm';
import { User } from './src/user/user.entity';

const config: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'inssoft_main_db',
  synchronize: true,
  entities: ["dist/**/*.entity{.ts,.js}"],
};
export default config;
