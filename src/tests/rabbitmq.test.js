'use strict';

const {
    connectToRabbitMQTest
} = require('../dbs/init.rabbit')

describe('RabbitMQ Connection', () => {
    it('should connect to RabbitMQ', async () => {
        const result = await connectToRabbitMQTest()
        expect(result).toBeUndefined()
    })
})