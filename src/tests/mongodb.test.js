'use strict';

const mongoose = require('mongoose');
const connectString = 'mongodb://localhost:27017/shopDEV'

const TestSchema = new mongoose.Schema({ name: String })
const TestModel = mongoose.model('Test', TestSchema)

describe('Mongo connection', () => {
    let connection;

    beforeAll(async () => {
        connection = await mongoose.connect(connectString)
    })

    // close connection to mongo
    afterAll(async () => {
        await connection.disconnect()
    })

    it('should connect to mongo', () => {
        expect(mongoose.connection.readyState).toBe(1)
    })

    it('should save a document to the database', async () => {
        const user = new TestModel({ name: 'Dinh Pham' })
        await user.save()
        expect(user.isNew).toBe(false)
    })

    it('should find a document in the database', async () => {
        const user = await TestModel.findOne({ name: 'Dinh Pham' })
        expect(user).toBeDefined()
        expect(user.name).toBe('Dinh Pham')
    })
})