const request = require("supertest");
const expect = require('chai').expect;
const basicSetup = require('./helper/basicSetup');
const express = require('express')
const app = express()
let contentRouter = require('../routers/contentRouter');
const { default: mongoose } = require("mongoose");

app.use(express.urlencoded({ extended: false }));
app.use('/content', contentRouter)

//create mock mongoDB for testing and mock object to use in tests
beforeAll(async () => {
    await basicSetup.connect();
    app.listen(5009)
});

//close db and server
afterAll(async () => {
    await basicSetup.clearDatabase()
    await basicSetup.closeDatabase()
});

//test getting all db data
describe('GET: /get all contents', ()=>{
    it('valid data', async ()=>{
        await request(app).get('/content')
            .then((res)=>{
                expect(res.statusCode).to.equal(210);
                expect(res.body[0]).to.equal(undefined)
            })
    })
})