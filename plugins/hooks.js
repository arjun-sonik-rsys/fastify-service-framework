// plugins/hooks.js

export default async function hooksPlugin(fastify) {
    // Log incoming requests
    fastify.addHook('onRequest', async (request, reply) => {
      fastify.log.info({ method: request.method, url: request.url }, 'Incoming request');
    });
  
    // Log outgoing responses
    fastify.addHook('onSend', async (request, reply, payload) => {
      fastify.log.info({ statusCode: reply.statusCode }, 'Sending response');
      return payload;
    });
  
    // Catch and log unhandled errors
    fastify.addHook('onError', async (request, reply, error) => {
      fastify.log.error(error, 'Unhandled error');
    });
  }
  