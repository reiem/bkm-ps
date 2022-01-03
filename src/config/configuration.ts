import { join } from 'path/posix';

export default () => {
  const isTest = process.env.NODE_ENV === 'test';
  const isProduction = process.env.NODE_ENV === 'prduction';
  return {
    database: {
      type: 'postgres',
      host: isTest ? process.env.DB_TEST_HOST : process.env.DB_HOST,
      port: isTest ? process.env.DB_TEST_PORT : process.env.DB_PORT,
      database: isTest ? process.env.DB_TEST_NAME : process.env.DB_NAME,
      username: isTest ? process.env.DB_TEST_USER : process.env.DB_USER,
      password: isTest ? process.env.DB_TEST_PASSWORD : process.env.DB_PASSWORD,
      synchronize: !isProduction,
      entities: [join(__dirname, '..', '**', 'entities', '*.entity.{ts,js}')],
    },
  };
};
