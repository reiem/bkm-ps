import { join } from 'path/posix';

export default () => {
  const envionment = process.env.NODE_ENV ?? 'development';
  const isTest = envionment === 'test';
  const isProduction = envionment === 'prduction';

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
    auth: {
      auth0: {
        audience: process.env.AUTH0_AUDIENCE,
        domain: process.env.AUTH0_DOMAIN,
      },
    },
  };
};
