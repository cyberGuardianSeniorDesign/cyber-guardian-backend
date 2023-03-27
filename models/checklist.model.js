const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ChecklistSchema = new Schema({
    title: String,
    author: String,
    level: String,
    description: String,
    content: [
        {
            index: String,
            contentType: String,
            text: String,
            caption: String
        }
    ],
    thumbnail: String
})

module.exports = mongoose.model("Checklist", ChecklistSchema)