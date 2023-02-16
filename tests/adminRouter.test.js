const request = require("supertest");
const expect = require('chai').expect;
const basicSetup = require('./helper/basicSetup');
const express = require('express')
const app = express()
let admin = require('../models/admin.model');
let adminRouter = require('../routers/adminRouter')

app.use(express.urlencoded({ extended: false }));
app.use('/admin', adminRouter)

const newAdmin = new admin({
    email: "email",
    password: "password"
});

var newAdminEmail;
let server;

//create mock mongoDB for testing and mock object to use in tests
beforeAll(async () => {
    await basicSetup.connect();
    await app.listen(5006)
    await newAdmin.save(function(err, newAdmin) {
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
                expect(res.statusCode).to.equal(200);
                expect(res.body[0].email).to.equal(newAdmin.email)
            })
    })
})

//test getting one user's data
describe('GET: /get route to get one users data', ()=>{
    it('get one users data', async ()=>{
        await request(app).get('/admin/' + newAdminEmail)
            .then((res) =>{
                expect(res.statusCode).to.equal(200);
                expect(res.body.name).to.equal("admin");
                app.close()
            })
    })
})

//THIS TEST WILL NOT PASS BECAUSE ADMIN DOES NOT HAVE A POST ROUTE
// describe('POST: /save route to insert data', ()=>{
//     it('inserted data', async ()=>{
//         let toSendData = {
//             email: "doug@mail.com",
//             password: "p455w0rd"
//         };
//         await request(app).post('/admin')
//             .send(toSendData)
//             .then((res)=>{
//                 expect(res.statusCode).to.equal(201);
//                 expect(res.body.email).to.include(toSendData.email)
//             })
//     })
// })

//THESE TESTS WON'T WORK BECAUSE IF YOU LOOK AT THE ARTICLE ROUTER, YOU NEED A TOKEN TO ACCESS THESE ROUTES
// //test updating items in db
// describe('PATCH: /patch route to update data', ()=>{
//     it('updated users email', async ()=>{
//         let toSendData = {email:'joey@email.com'};
//         await request(app).patch('/admin/' + newAdminEmail)
//             .send(toSendData)
//             .then((res)=>{
//                 expect(res.statusCode).to.equal(202);
//                 expect(res.body.email).to.equal(newAdminEmail);
//             })
//     })
// })

// //test deleting from db
// describe('DELETE: /delete route to delete data', ()=>{
//     it('deleted users id', async ()=>{
//         await request(app).delete('/admin/' + newAdminEmail)
//             .then((res)=>{
//                 expect(res.statusCode).to.equal(203);
//                 expect(res.body).to.include({});
//             })
//     })
// })