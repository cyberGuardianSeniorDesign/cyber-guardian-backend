const request = require("supertest");
const expect = require('chai').expect;
const basicSetup = require('./helper/basicSetup');
const express = require('express')
const app = express()
let learningPath = require('../models/learningPath.model');
let learningPathRouter = require('../routers/learningPathRouter');
const { default: mongoose } = require("mongoose");

app.use(express.urlencoded({ extended: false }));
app.use('/learningPath', learningPathRouter)

const newLearningPath = new learningPath({
    id: 1,
    title: "title" ,
    author: "author",
    content: []
});

var newLearningPathId

//create mock mongoDB for testing and mock object to use in tests
beforeAll(async () => {
    await basicSetup.connect();
    app.listen(5011)
    newLearningPath.save(function (err, newLearningPath) {
        newLearningPathId = newLearningPath.id;
    })
});

//close db and server
afterAll(async () => {
    await basicSetup.clearDatabase()
    await basicSetup.closeDatabase()
});

//test getting all db data
describe('GET: /get all learningPaths', ()=>{
    it('valid data', async ()=>{
        await request(app).get('/learningPath')
            .then((res)=>{
                expect(res.statusCode).to.equal(200);
                expect(res.body[0].id).to.equal(undefined)
            })
    })
})

//test getting one user's data
describe('GET: /get route to get one users data', ()=>{
    it('get one paths data', async ()=>{
        await request(app).get('/learningPath/' + newLearningPathId)
            .then((res) =>{
                expect(res.statusCode).to.equal(201);
                expect(res.body.id).to.equal(undefined);
            })
    })
})

describe('POST: /save route to insert data', ()=>{
    it('inserted data', async ()=>{
        let toSendData = {
            id: 2,
            title: "learningPath1",
            author: "author1",
            content: []
        };
        await request(app).post('/learningPath')
            .send(toSendData)
            .then((res)=>{
                expect(res.statusCode).to.equal(202);
                expect(res.body.id).to.equal(undefined)
            })
    })
})

//test updating items in db
describe('PATCH: /patch route to update data', ()=>{
    it('updated path title', async ()=>{
        let toSendData = {title:'learningPath2'};
        await request(app).patch('/learningPath/' + newLearningPathId)
            .send(toSendData)
            .then((res)=>{
                expect(res.statusCode).to.equal(203);
                expect(res.body.id).to.equal(undefined);
            })
    })
})

//test deleting from db
describe('DELETE: /delete route to delete data', ()=>{
    it('deleted path id', async ()=>{
        await request(app).delete('/learningPath/' + newLearningPathId)
            .then((res)=>{
                expect(res.statusCode).to.equal(209);
                expect(res.body).to.include({});
            })
    })
})