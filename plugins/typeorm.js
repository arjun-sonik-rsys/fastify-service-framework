import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'your_user',
  password: 'your_password',
  database: 'your_db',
  entities: ['src/entities/*.js'], // adjust path
  synchronize: true,
});

export default async function (fastify, opts) {
  try {
    await AppDataSource.initialize();
    fastify.decorate('typeorm', AppDataSource);
  } catch (err) {
    fastify.log.error('Failed to initialize TypeORM', err);
  }
}
