import createError from 'http-errors';


export default async function (fastify) {
    fastify.get('/', async () => {
      return { health: 'ok' };
    });

    fastify.get('/error-demo', async (req, reply) => {
      throw createError(400, 'This is a bad request example');
    });

    fastify.get('/status', {
      onRequest: async (req, reply) => {
        console.log('onRequest for /status');
      }
    }, async (req, reply) => {
      return { status: 'ok' };
    });
    
  }
  