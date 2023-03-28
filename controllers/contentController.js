const Article = require('../models/article.model')
const Checklists = require('../models/checklist.model')
const LearningPath = require('../models/learningPath.model')
const Game = require('../models/game.model')

exports.getContent = async(req, res) => {
    const articles = await Article.find()
    const checklists = await Checklists.find()
    const learningPath = await LearningPath.find()
    const games = await Game.find()

    res.status(210).json({
            articles: articles,
            checklists: checklists,
            learningPath: learningPath,
            games: games
    })
}