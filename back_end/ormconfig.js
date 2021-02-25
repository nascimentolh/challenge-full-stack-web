module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST || '127.0.0.1',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'docker',
  database: process.env.DB_NAME || 'dev_grupoa',
  charset: 'utf8',
  synchronize: process.env.NODE_ENV !== 'production',
  entities: [
    '**/**.entity.ts',
    // '**/**.entity.js'
  ],
  logging: process.env.NODE_ENV !== 'production' ? 'all' : 'error',
  migrations: ['migration/*.ts'],
  cli: {
    migrationsDir: 'migration',
  },
  connectTimeout: 30000,
  acquireTimeout: 30000,
};
