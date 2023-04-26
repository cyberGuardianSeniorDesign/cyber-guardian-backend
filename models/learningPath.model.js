const mongoose = require('mongoose')

const Schema = mongoose.Schema

const LearningPathSchema = new Schema({
    title: String,
    author: String,
    level: String,
    description: String,
    content: [{
        index: String,
        contentType: String,
        title: String,
        description: String,
        img: String,
        data: {},
        link: String
    }],
    thumbnail: String
}, {timestamps: true})

module.exports = mongoose.model("LearningPath", LearningPathSchema)