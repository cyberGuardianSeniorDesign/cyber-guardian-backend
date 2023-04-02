const Article = require('../models/article.model')
const Checklists = require('../models/checklist.model')
const LearningPath = require('../models/learningPath.model')
const Game = require('../models/game.model')

exports.getContent = async(req, res) => {
    //get content and sort from most to least recent
    let articles = await Article.find().sort({ createdAt: -1})
    let checklists = await Checklists.find().find().sort({ createdAt: -1})
    let learningPath = await LearningPath.find().find().sort({ createdAt: -1})
    let games = await Game.find()

    console.log(articles)
    res.status(210).json({
            articles: articles,
            checklists: checklists,
            learningPath: learningPath,
            games: games
    })
}