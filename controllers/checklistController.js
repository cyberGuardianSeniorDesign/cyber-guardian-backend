const Checklist = require('../models/checklist.model.js')

exports.getChecklists = (req, res) => {
    Checklist.find()
        .then(checklists =>{
            return res.status(200).json(checklists)
        })
        .catch(err => {
            res.status(500).json({message: 'Could not GET checklists: ' + err})
        })
} 

exports.getOneChecklist = (req, res) => {
    const id = req.params.id

    Checklist.findById(id)
        .then(checklist =>{
            return res.status(201).json(checklist)
        })
        .catch(err => {
            res.status(501).json({message: 'Could not GET checklist: ' + err})
        })
} 

exports.createChecklist = (req, res) => {
    const title = req.body.title
    const author = req.body.author
    const level = req.body.level
    const description = req.body.description
    const content = req.body.content
    const thumbnail = req.body.thumbnail

    const newChecklist = new Checklist({
            title: title,
            author: author,
            level: level,
            description: description,
            content: content,
            thumbnail: thumbnail
    })
    
    newChecklist.save()
        .then(checklist => {
            return res.status(202).json(checklist)
        })
        .catch( err => {
            return res.status(502).json({message: 'Could not save checklist: ' + err})
        })
}

exports.updateChecklist = async(req, res) => {
    const id = req.params.id
    const update = req.body
    console.log(id)
    try{
        await Checklist.findOneAndUpdate({_id: id}, update)
        return res.status(203).json({message: 'Checklist Updated'})
    } catch(err){
        return res.status(503).json({message: 'Could not update checklist' + err})
    }
}

exports.deleteChecklist = (req, res) => {
    const id = req.params.id

    Checklist.findByIdAndDelete(id)
    .then(res.status(209).json({message: 'Checklist Deleted'}))
    .catch(err => {
        return res.status(509).json({message: 'Checklist could not be deleted: ' + err})
    })
}