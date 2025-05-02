export default async function (fastify, options) {
    fastify.decorate('db', {
      query: async () => {
        return [];
      }
    });
  }
  