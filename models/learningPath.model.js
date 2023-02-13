const mongoose = require('mongoose')

const Schema = mongoose.Schema

const LearningPathSchema = new Schema({
    title: String,
    author: String,
    level: String,
    content: [{
        index: Number,
        contentType: String,
        text: String
    }]
})

module.exports = mongoose.model("LearningPath", LearningPathSchema)