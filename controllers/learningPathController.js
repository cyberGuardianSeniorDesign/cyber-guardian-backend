const LearningPath = require('../models/learningPath.model.js')

exports.getLearningPaths = (req, res) => {
    LearningPath.find()
        .then(learningPaths =>{
            return res.status(200).json(learningPaths)
        })
        .catch(err => {
            res.status(500).json({message: 'Could not GET learning paths: ' + err})
        })
} 

exports.getOneLearningPath = (req, res) => {
    const id = req.params.id

    LearningPath.findById(id)
        .then(learningPath =>{
            return res.status(201).json(learningPath)
        })
        .catch(err => {
            res.status(501).json({message: 'Could not GET learning paths: ' + err})
        })
} 

exports.createLearningPath = (req, res) => {
    const title = req.body.title
    const author = req.body.author
    const level = req.body.level
    const content = req.body.content
    const description = req.body.description

    const newLearningPath = new LearningPath({
            title: title,
            author: author,
            level: level,
            content: content,
            description: description
        })
        
    newLearningPath.save()
        .then( learningPath => {
            return res.status(202).json(learningPath)
        })
        .catch( err => {
            return res.status(502).json({message: 'Could not save learning path: ' + err})
        })
}

exports.updateLearningPath = async(req, res) => {
    const id = req.params.id
    const update = req.body

    console.log(id)
    console.log(update)
    try{
        await LearningPath.findOneAndUpdate({_id: id}, update)
        return res.status(203).json({message: 'LearningPath Updated'})
    } catch(err){
        return res.status(503).json({message: 'Could not update learning path' + err})
    }
}

exports.deleteLearningPath = (req, res) => {
    const id = req.params.id

    LearningPath.findByIdAndDelete(id)
    .then(res.status(209).json({message: 'Learning Path Deleted'}))
    .catch(err => {
        return res.status(509).json({message: 'LearningPath could not be deleted: ' + err})
    })
}