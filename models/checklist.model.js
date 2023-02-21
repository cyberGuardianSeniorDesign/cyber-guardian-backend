const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ChecklistSchema = new Schema({
    title: String,
    author: String,
    level: String,
    description: String,
    content: [
        {
            index: Number,
            contentType: String,
            text: String
        }
    ]
})

module.exports = mongoose.model("Checklist", ChecklistSchema)