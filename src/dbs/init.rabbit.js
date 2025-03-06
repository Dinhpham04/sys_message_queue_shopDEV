'use strict';

const amqp = require('amqplib')

const connectToRabbitMQ = async () => {
    try {
        const connection = await amqp.connect('amqp://guest:12345@localhost')
        if (!connection) throw new Error('connect rabbitmq failed')

        const channel = await connection.createChannel()
        return { channel, connection }
    } catch (error) {
        throw new Error(error)
    }
}

const connectToRabbitMQTest = async () => {
    try {
        const { channel, connection } = await connectToRabbitMQ()

        // pulish message to a queue
        const queueName = 'test-queue'
        const message = 'hello, shopDev by DinhPham'
        await channel.assertQueue(queueName, {
            durable: true // mất dữ liệu khi server bị crack 
        })
        await channel.sendToQueue(queueName, Buffer.from(message))

        // close the connection
        await connection.close()
    } catch (error) {
        console.error(`Error connecting to RabbitMQ: ${error}`)
    }
}

module.exports = {
    connectToRabbitMQ,
    connectToRabbitMQTest
}