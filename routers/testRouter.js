const express = require('express')
const testRouter = express.Router()
const testController = require('../controllers/testController')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const verifyJWT = require('../verifyRouter')

testRouter.get('/', testController.getTests)

testRouter.get('/:id', testController.getOneTest)

testRouter.post('/', verifyJWT, jsonParser, testController.createTest)

testRouter.patch('/:id', verifyJWT, jsonParser, testController.updateTest)

testRouter.delete('/:id', verifyJWT, testController.deleteTest)

module.exports = testRouter
