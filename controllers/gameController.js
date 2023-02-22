const Game = require('../models/game.model')

exports.getGames = async(req, res) => {
    Game.find()
    .then(games =>{
        return res.status(200).json(games)
    })
    .catch(err => {
        res.status(500).json({message: 'Could not GET games'})
    })
}

exports.getOneGame = (req, res) => {
    const id = req.params.id

    Game.findById(id)
        .then(game =>{
            return res.status(201).json(game)
        })
        .catch(err => {
            res.status(501).json({message: 'Could not GET game'})
        })
} 

exports.createGame = async(req, res) => {
    const title = req.body.title
    const description = req.body.description
    const running = req.body.running

    const newGame = new Game({
            title: title,
            description: description,
            running: running
    })
    
    newGame.save()
        .then(game => {
            return res.status(202).json(game)
        })
        .catch( err => {
            return res.status(502).json({message: 'Could not save checklist: ' + err})
        })
}

exports.updateGame = async(req, res) => {
    const id = req.params.id
    const update = req.body
    try{
        await Game.findOneAndUpdate({_id: id}, update)
        return res.status(203).json({message: 'Game Updated'})
    } catch(err){
        return res.status(503).json({message: 'Could not update game'})
    }
}

