import amqp from 'amqplib';

export default async function (fastify) {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  await channel.assertQueue('my-queue', { durable: false });

  fastify.decorate('mq', {
    sendToQueue: (msg) => channel.sendToQueue('my-queue', Buffer.from(msg)),
    consume: (cb) => channel.consume('my-queue', cb, { noAck: true }),
  });

  fastify.addHook('onClose', async () => {
    await channel.close();
    await connection.close();
  });
}
