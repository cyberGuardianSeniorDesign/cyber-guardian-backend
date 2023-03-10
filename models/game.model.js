const mongoose = require('mongoose')

const Schema = mongoose.Schema

const GameSchema = new Schema({
    title: String,
    description: String,
    running: Boolean
})

module.exports = mongoose.model("Game", GameSchema)