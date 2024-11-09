"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageBroker = void 0;
const amqplib = require('amqplib');
class MessageBroker {
    /*
    *   TODO:
    *   Provide type for object comes from amqp.
    */
    amqpConnection;
    amqpChannel;
    queues;
    get AmqpChannel() {
        return this.amqpChannel;
    }
    constructor() {
        this.queues = {};
    }
    initConnection = async () => {
        try {
            var amqp_url = process.env.CLOUDAMQP_URL || 'amqp://localhost:5672';
            this.amqpConnection = await amqplib.connect(amqp_url);
            this.amqpChannel = await this.amqpConnection.createChannel();
            process.once("SIGINT", async () => {
                await this.amqpChannel.close();
                await this.amqpConnection.close();
            });
            console.log("Connected to amqp server.");
        }
        catch (err) {
            console.warn(err);
        }
    };
    static create = async () => {
        var messageBroker = new MessageBroker();
        await messageBroker.initConnection();
        return messageBroker;
    };
    publishTask = async (queueName, task) => {
        const exchangeName = "Tasks";
        const routingKey = "Normal";
        await this.amqpChannel.assertExchange(exchangeName, 'direct', { durable: true });
        await this.amqpChannel.assertQueue(queueName, { exclusive: false }, { noAck: true });
        await this.amqpChannel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(task)));
        console.log(` [x] Publish task. Task id: ${task.taskID} `);
    };
    /* TODO:
    * Now the publisher and consumer are functions, however they should be standalone classes,
    * so that we can access information like exchange name and routing key.
    */
    createTaskPublisher = (exchangeName, routingKey) => {
        return async (queueName, task) => {
            await this.amqpChannel.assertExchange(exchangeName, 'direct', { durable: true });
            await this.amqpChannel.assertQueue(queueName, { exclusive: false }, { noAck: true });
            await this.amqpChannel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(task)));
            console.log(` [x] Publish task. Task id: ${task.taskID} `);
        };
    };
    createTaskConsumer = (exchangeName, routingKey) => {
        return async (queueName, OnEventHandler) => {
            await this.amqpChannel.assertExchange(exchangeName, 'direct', { durable: true });
            await this.amqpChannel.assertQueue(queueName, { exclusive: false }, { noAck: true });
            await this.amqpChannel.bindQueue(queueName, exchangeName, routingKey);
            await this.amqpChannel.consume(queueName, OnEventHandler, { noAck: false });
            /*
            await this.amqpChannel.consume(
                queueName,
                (message: any) => {
                    if (message) {
                        let object: BaseTask = JSON.parse(message.content.toString())
                        console.log(
                            " [x] Received '%s'",
                            object
                        );
                        console.log("receive id: ", object.taskID);
                    }
                    },
                    { noAck: false }
            );
            */
        };
    };
    createMessageExchange = async (queueName) => {
        try {
            const exchangeName = "Tasks";
            const routingKey = "Normal";
            try {
                /*
                    To ensure there's no existing exchange and queue with same name.
                    TODO:
                    Throw a error instead of delete them directly in production environment.
                */
                this.amqpChannel.deleteExchange(exchangeName);
                this.amqpChannel.deleteQueue(queueName);
            }
            catch (e) { }
        }
        catch (e) {
            console.log(`Error while creating message queue. Error: ${e}`);
        }
    };
}
exports.MessageBroker = MessageBroker;
