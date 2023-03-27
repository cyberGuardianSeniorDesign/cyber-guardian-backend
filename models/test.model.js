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
        text: [],
        caption: String
    }],
    thumbnail: String
})

module.exports = mongoose.model("Test", TestSchema)