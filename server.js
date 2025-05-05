// server.js

import Fastify from 'fastify';
import dotenv from 'dotenv';
import cors from '@fastify/cors';
import fastifyMultipart from 'fastify-multipart';

import indexRoutes from './routes/index.route.js';
import userRoutes from './routes/user.route.js';
import taskRoutes from './routes/tasks.route.js';
import uploadRoutes from './routes/upload.route.js';

import dbPlugin from './plugins/db.js';
import typeormPlugin from './plugins/typeorm.js';
import rabbitmqPlugin from './plugins/rabbitmq.js';
import errorHandlerPlugin from './plugins/error-handler.js';
import hooksPlugin from './plugins/hooks.js';

// Load environment variables
dotenv.config();

// ✅ Pass logger config directly to Fastify (not a pino instance)
const fastify = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
      },
    },
  },
});

// Plugins
fastify.register(cors, { origin: '*' });
fastify.register(fastifyMultipart, {
  limits: { fileSize: 10000000 },
});
await fastify.register(hooksPlugin);

fastify.register(dbPlugin);
// fastify.register(typeormPlugin);
// fastify.register(rabbitmqPlugin);
fastify.register(errorHandlerPlugin);

// Routes
fastify.register(indexRoutes);
fastify.register(userRoutes, { prefix: '/user' });
fastify.register(taskRoutes, { prefix: '/tasks' });
fastify.register(uploadRoutes, { prefix: '/upload' });

// Start server
const start = async () => {
  try {
    const port = process.env.PORT || 3000;
    await fastify.listen({ port });
    fastify.log.info(`🚀 Server running at http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
