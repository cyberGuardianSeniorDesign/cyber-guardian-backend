const request = require("supertest");
const expect = require('chai').expect;
const basicSetup = require('./helper/basicSetup');
const express = require('express')
const app = express()
let article = require('../models/article.model');
let articleRouter = require('../routers/articleRouter');
const { default: mongoose } = require("mongoose");

app.use(express.urlencoded({ extended: false }));
app.use('/article', articleRouter)

const newArticle = new article({
    id: 1,
    title: "title" ,
    author: "author",
    level: "basic",
    content: []
});

var newArticleId

//create mock mongoDB for testing and mock object to use in tests
beforeAll(async () => {
    await basicSetup.connect();
    app.listen(5007)
    newArticle.save(function (err, newArticle) {
        newArticleId = newArticle.id;
    })
});

//close db and server
afterAll(async () => {
    await basicSetup.clearDatabase()
    await basicSetup.closeDatabase()
});

//test getting all db data
describe('GET: /get all articles', ()=>{
    it('valid data', async ()=>{
        await request(app).get('/article')
            .then((res)=>{
                expect(res.statusCode).to.equal(200);
                expect(res.body[0].id).to.equal(undefined)
            })
    })
})

//test getting one user's data
describe('GET: /get route to get one users data', ()=>{
    it('get one users data', async ()=>{
        await request(app).get('/article/' + newArticleId)
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
            title: "article1",
            author: "author1",
            level: "intermediate",
            content: []
        };
        await request(app).post('/article')
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
        let toSendData = {title:'article2'};
        await request(app).patch('/article/' + newArticleId)
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
        await request(app).delete('/article/' + newArticleId)
            .then((res)=>{
                expect(res.statusCode).to.equal(209);
                expect(res.body).to.include({});
            })
    })
})