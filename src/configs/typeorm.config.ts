import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'dev',
  password: 'owllocal',
  database: 'owldb',
  entities: ['/src/**/*.entity.ts'],
  synchronize: false,
  migrations: ['/src/db/migrations/*.ts'],
  subscribers: ['/src/db/subscriber/*.ts'],
};

export default config;
