const express = require('express')
const learningPathRouter = express.Router()
const learningPathController = require('../controllers/learningPathController')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const verifyJWT = require('../verifyRouter')

learningPathRouter.get('/', learningPathController.getLearningPaths)

learningPathRouter.get('/:id', learningPathController.getOneLearningPath)

learningPathRouter.post('/', verifyJWT, jsonParser, learningPathController.createLearningPath)

learningPathRouter.patch('/:id', verifyJWT, jsonParser, learningPathController.updateLearningPath)

learningPathRouter.delete('/:id', verifyJWT, learningPathController.deleteLearningPath)

module.exports = learningPathRouter
