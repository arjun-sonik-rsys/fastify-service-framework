export default async function (fastify) {
    fastify.get('/:id', async (req) => {
      return { userId: req.params.id };
    });
  }
  