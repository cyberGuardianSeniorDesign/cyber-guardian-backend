'use strict';

const dotenv = require('dotenv')
//configure .env file
dotenv.config()

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod = undefined;

module.exports.connect = async () => {
    mongod = await MongoMemoryServer.create();
    const uri = process.env.DEV_DB;

    const mongooseOpts = {
        useNewUrlParser: true
    };

    await mongoose.connect(uri, mongooseOpts);
};

module.exports.closeDatabase = async () => {
    if (mongod) {
        await mongoose.connection.close();
        await mongod.stop();
    }
};

module.exports.clearDatabase = async () => {
    if(mongod) {
        const collections = mongoose.connection.collections;

        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany();
        }
    }
};