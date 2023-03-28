const Test = require('../models/test.model.js')

exports.getTests = (req, res) => {
    Test.find()
        .then(tests =>{
            return res.status(200).json(tests)
        })
        .catch(err => {
            res.status(500).json({message: 'Could not GET tests: ' + err})
        })
} 

exports.getOneTest = (req, res) => {
    const id = req.params.id

    Test.findById(id)
        .then(test =>{
            return res.status(201).json(test)
        })
        .catch(err => {
            res.status(501).json({message: 'Could not GET tests: ' + err})
        })
} 

exports.createTest = (req, res) => {
    const title = req.body.title
    const author = req.body.author
    const level = req.body.level
    const description = req.body.description
    let content = req.body.content

    const newTest = new Test({
            title: title,
            author: author,
            level: level,
            description: description,
            content: content,
        })
        
    newTest.save()
        .then( test => {
            return res.status(202).json(test)
        })
        .catch( err => {
            console.log(err)
            return res.status(502).json({message: 'Could not save test: ' + err})
        })
}

exports.updateTest = async(req, res) => {
    const id = req.params.id
    const update = req.body
    try{
        await Test.findOneAndUpdate({_id: id}, update)
      
        return res.status(203).json({message: 'Test Updated'})
    } catch(err){
        console.log(err)
        return res.status(503).json({message: 'Could not update test' + err})
    }
}

exports.deleteTest = (req, res) => {
    const id = req.params.id

    Test.findByIdAndDelete(id)
    .then(res.status(209).json({message: 'Test Deleted'}))
    .catch(err => {
        return res.status(509).json({message: 'Test could not be deleted: ' + err})
    })
}