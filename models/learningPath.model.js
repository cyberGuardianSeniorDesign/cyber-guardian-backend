const mongoose = require('mongoose')

const Schema = mongoose.Schema

const LearningPathSchema = new Schema({
    title: String,
    author: String,
    level: String,
    description: String,
    content: [{
        index: Number,
        contentType: String,
        title: String,
        description: String,
        link: String
    }]
})

module.exports = mongoose.model("LearningPath", LearningPathSchema)