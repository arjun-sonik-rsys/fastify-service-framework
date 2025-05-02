export default async function (fastify) {
    fastify.get('/', async () => {
      return { health: 'ok' };
    });
  }
  