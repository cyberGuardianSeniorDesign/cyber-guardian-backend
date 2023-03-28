const mongoose = require('mongoose')

const Schema = mongoose.Schema

const LearningPathSchema = new Schema({
    title: String,
    author: String,
    content: [{
        index: Number,
        contentType: String,
        title: String,
        description: String,
        link: String
    }],
    thumbnail: String
})

module.exports = mongoose.model("LearningPath", LearningPathSchema)