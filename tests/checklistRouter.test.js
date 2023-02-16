const request = require("supertest");
const expect = require('chai').expect;
const basicSetup = require('./helper/basicSetup');
const express = require('express')
const app = express()
let checklist = require('../models/checklist.model');
let checklistRouter = require('../routers/checklistRouter');
const { default: mongoose } = require("mongoose");

app.use(express.urlencoded({ extended: false }));
app.use('/checklist', checklistRouter)

const newChecklist = new checklist({
    id: 1,
    title: "title" ,
    author: "author",
    content: []
});

var newChecklistId

//create mock mongoDB for testing and mock object to use in tests
beforeAll(async () => {
    await basicSetup.connect();
    app.listen(5008)
    newChecklist.save(function (err, newChecklist) {
        newChecklistId = newChecklist.id;
    })
});

//close db and server
afterAll(async () => {
    await basicSetup.clearDatabase()
    await basicSetup.closeDatabase()
});

//test getting all db data
describe('GET: /get all checklists', ()=>{
    it('valid data', async ()=>{
        await request(app).get('/checklist')
            .then((res)=>{
                expect(res.statusCode).to.equal(200);
                expect(res.body[0].id).to.equal(undefined)
            })
    })
})

//test getting one user's data
describe('GET: /get route to get one users data', ()=>{
    it('get one users data', async ()=>{
        await request(app).get('/checklist/' + newChecklistId)
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
            title: "checklist1",
            author: "author1",
            content: []
        };
        await request(app).post('/checklist')
            .send(toSendData)
            .then((res)=>{
                expect(res.statusCode).to.equal(202);
                expect(res.body.id).to.equal(undefined)
            })
    })
})

//test updating items in db
describe('PATCH: /patch route to update data', ()=>{
    it('updated users title', async ()=>{
        let toSendData = {title:'checklist2'};
        await request(app).patch('/checklist/' + newChecklistId)
            .send(toSendData)
            .then((res)=>{
                expect(res.statusCode).to.equal(203);
                expect(res.body.id).to.equal(undefined);
            })
    })
})

//test deleting from db
describe('DELETE: /delete route to delete data', ()=>{
    it('deleted users id', async ()=>{
        await request(app).delete('/checklist/' + newChecklistId)
            .then((res)=>{
                expect(res.statusCode).to.equal(209);
                expect(res.body).to.include({});
            })
    })
})