var mongoose = require("mongoose")

var Schema = mongoose.Schema

var SavedSchema = new Schema({
    id: {
        type: Number
    },
    title: {
        type: String
    },
    summary: {
        type: String
    },
    url: {
        type: String
    }
})

var Saved = mongoose.model("Saved", SavedSchema)

module.exports = Saved;