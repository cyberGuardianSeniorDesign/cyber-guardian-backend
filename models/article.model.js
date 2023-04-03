const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ArticleSchema = new Schema({
    title: String ,
    author: String,
    level: String,
    description: String,
    content: [{
        index: String,
        contentType: String,
        header: String,
        text: String,
        raw: {},
        caption: String
    }],
    thumbnail: String
}, {timestamps: true})

module.exports = mongoose.model("Article", ArticleSchema)   