const request = require("supertest");
const expect = require('chai').expect;
const basicSetup = require('./helper/basicSetup');
const express = require('express')
const app = express()
let admin = require('../models/admin.model');
let adminRouter = require('../routers/adminRouter');
const { default: mongoose } = require("mongoose");

app.use(express.urlencoded({ extended: false }));
app.use('/admin', adminRouter)

const newAdmin = new admin({
    email: "email",
    password: "password"
});

var newAdminEmail = newAdmin.email;

//create mock mongoDB for testing and mock object to use in tests
beforeAll(async () => {
    await basicSetup.connect();
    app.listen(5006);
    newAdmin.save(function (err, newAdmin) {
        newAdminEmail = newAdmin.email;
    })
});

//close db and server
afterAll(async () => {
    await basicSetup.clearDatabase()
    await basicSetup.closeDatabase()
});

//test getting all db data
describe('GET: /get all admins', ()=>{
    it('valid data', async ()=>{
        await request(app).get('/admin')
            .then((res)=>{
                expect(res.statusCode).to.equal(204);
                expect(res.body[0]).to.equal(undefined)
            })
    })
})

//test getting one user's data
describe('GET: /get route to get one users data', ()=>{
    it('get one users data', async ()=>{
        await request(app).get('/admin/' + newAdminEmail)
            .then((res) =>{
                expect(res.statusCode).to.equal(205);
                expect(res.body.email).to.equal(undefined);
            })
    })
})

//test deleting from db
describe('DELETE: /delete route to delete data', ()=>{
    it('deleted users id', async ()=>{
        await request(app).delete('/admin/' + newAdminEmail)
            .then((res)=>{
                expect(res.statusCode).to.equal(208);
                expect(res.body).to.include({});
            })
    })
})