const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TestSchema = new Schema({
    title: String ,
    author: String,
    level: String,
    description: String,
    content: [{
        index: String,
        contentType: String,
        text: String,
        caption: String
    }],
    thumbnail: String
}, {timestamps: true})

module.exports = mongoose.model("Test", TestSchema)