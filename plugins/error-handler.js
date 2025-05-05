export default async function errorHandlerPlugin(fastify) {
    fastify.setErrorHandler((error, request, reply) => {
      const statusCode = error.statusCode || 500;
      const response = {
        statusCode,
        error: error.name || 'InternalServerError',
        message: error.message || 'Something went wrong',
      };
  
      // Optionally log more details in development
      if (process.env.NODE_ENV === 'development') {
        console.error('Error:', error);
      }
  
      reply.status(statusCode).send(response);
    });
  }
  