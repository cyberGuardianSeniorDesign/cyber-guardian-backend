const request = require("supertest");
const expect = require('chai').expect;
const basicSetup = require('./helper/basicSetup');
const express = require('express')
const app = express()
let game = require('../models/game.model');
let gameRouter = require('../routers/gameRouter');
const { default: mongoose } = require("mongoose");

app.use(express.urlencoded({ extended: false }));
app.use('/game', gameRouter)

const newGame = new game({
    id: 1,
    title: "title" ,
    running: false
});

var newGameId

//create mock mongoDB for testing and mock object to use in tests
beforeAll(async () => {
    await basicSetup.connect();
    app.listen(5010)
    newGame.save(function (err, newGame) {
        newGameId = newGame.id;
    })
});

//close db and server
afterAll(async () => {
    await basicSetup.clearDatabase()
    await basicSetup.closeDatabase()
});

//test getting all db data
describe('GET: /get all games', ()=>{
    it('valid data', async ()=>{
        await request(app).get('/game')
            .then((res)=>{
                expect(res.statusCode).to.equal(200);
                expect(res.body[0].id).to.equal(undefined)
            })
    })
})

//test getting one user's data
describe('GET: /get route to get one users data', ()=>{
    it('get one users data', async ()=>{
        await request(app).get('/game/' + newGameId)
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
            title: "Game1",
            description: "game description",
            running: true
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
    it('updated games status', async ()=>{
        let toSendData = {running: true};
        await request(app).patch('/game/' + newGameId)
            .send(toSendData)
            .then((res)=>{
                expect(res.statusCode).to.equal(203);
                expect(res.body.id).to.equal(undefined);
            })
    })
})