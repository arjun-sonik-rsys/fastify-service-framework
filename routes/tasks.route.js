import { TaskSchema } from '../schemas/task.schema.js';

let tasks = [
  { id: 1, title: 'Learn Fastify', completed: false }
];

export default async function (fastify) {
  // Get all
  fastify.get('/', async () => tasks);

  // Add
  fastify.post('/', { schema: { body: TaskSchema } }, async (req, reply) => {
    const { title, completed = false } = req.body;
    const newTask = { id: tasks.length + 1, title, completed };
    tasks.push(newTask);
    reply.code(201).send(newTask);
  });

  // Update
  fastify.put('/:id', { schema: { body: TaskSchema } }, async (req, reply) => {
    const { id } = req.params;
    const index = tasks.findIndex(t => t.id == id);
    if (index === -1) return reply.code(404).send({ error: 'Task not found' });

    tasks[index] = { ...tasks[index], ...req.body };
    reply.send(tasks[index]);
  });

  // Delete
  fastify.delete('/:id', async (req, reply) => {
    const { id } = req.params;
    tasks = tasks.filter(t => t.id != id);
    reply.code(204).send();
  });
}
