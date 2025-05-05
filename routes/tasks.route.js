import { TaskSchema } from '../schemas/task.schema.js';
import createError from 'http-errors';

let tasks = [
  { id: 1, title: 'Learn Fastify', completed: false }
];

export default async function (fastify) {
  // Route-level hook for task routes
  fastify.addHook('onRequest', async (req, reply) => {
    fastify.log.info(`Task Route Hit: ${req.method} ${req.url}`);
  });

  // Get all tasks
  fastify.get('/', async () => tasks);

  // Add a task
  fastify.post('/', { schema: { body: TaskSchema } }, async (req, reply) => {
    const { title, completed = false } = req.body;

    if (!title || typeof title !== 'string') {
      throw createError(400, 'Valid "title" is required');
    }

    const newTask = { id: tasks.length + 1, title, completed };
    tasks.push(newTask);
    reply.code(201).send(newTask);
  });

  // Update a task
  fastify.put('/:id', { schema: { body: TaskSchema } }, async (req, reply) => {
    const { id } = req.params;
    const index = tasks.findIndex(t => t.id == id);

    if (index === -1) {
      throw createError(404, `Task with ID ${id} not found`);
    }

    tasks[index] = { ...tasks[index], ...req.body };
    reply.send(tasks[index]);
  });

  // Delete a task
  fastify.delete('/:id', async (req, reply) => {
    const { id } = req.params;
    const exists = tasks.some(t => t.id == id);

    if (!exists) {
      throw createError(404, `Task with ID ${id} not found`);
    }

    tasks = tasks.filter(t => t.id != id);
    reply.code(204).send();
  });
}
