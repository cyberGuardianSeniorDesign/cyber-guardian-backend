const mongoose = require('mongoose')

const Schema = mongoose.Schema

const GameSchema = new Schema({
    title: String,
    description: String,
    running: Boolean,
    thumbnail: String
}, {timestamps: true})

module.exports = mongoose.model("Game", GameSchema)