const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ChecklistSchema = new Schema({
    title: String,
    author: String,
    level: String,
    content: String
})

module.exports = mongoose.model("Checklist", ChecklistSchema)