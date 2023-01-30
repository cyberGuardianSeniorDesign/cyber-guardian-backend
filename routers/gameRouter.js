const express = require('express')
const gameRouter = express.Router()
const gameController = require('../controllers/gameController')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const verifyJWT = require('../verifyRouter')

gameRouter.get('/', gameController.getGames)
gameRouter.get('/:id', gameController.getOneGame)
gameRouter.patch('/:id', verifyJWT, bodyParser, gameController.updateGame)

module.exports = gameRouter
