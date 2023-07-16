const amqplib = require("amqplib");
const { MESSAGE_BROKER_URL, EXCHANGE_NAME } = require('../config/ServerConfig');

// let channel;

const createChannel = async () => {
    try {
        let channel;
        if (!channel) {
            const connection = await amqplib.connect(MESSAGE_BROKER_URL);
            channel = await connection.createChannel();
            await channel.assertExchange(EXCHANGE_NAME, 'direct', false);

        }
        return channel;
    } catch (error) {
        throw error
    }
}
 const getChannel = async () => {
    if (!channel) {
      channel = await createChannel();
    }
    return channel;
  };
  
const subscribeMessage = async (channel, service, binding_key) => {
    try {
        const application_queue = await channel.assertQueue("queue-name");

        channel.bindQueue(application_queue.queue, EXCHANGE_NAME, binding_key);

        channel.consume(application_queue.queue, message => {
            if (message !== null) {
                console.log('Received message:', message.content.toString());
                channel.ack(message);
            }

        })
    } catch (error) {
        throw error
    }
}

const publishMessage = async (channel, routing_key, message) => {
    try {

        await channel.assertQueue('queue-name');
        await channel.publish(EXCHANGE_NAME, routing_key, Buffer.from(message));

        console.log('Message published:', message);

    } catch (error) {
        throw error
    }
}


module.exports = {
    createChannel,
    publishMessage,
    subscribeMessage,
    getChannel
}