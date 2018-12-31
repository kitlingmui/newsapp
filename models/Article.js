var mongoose = require("mongoose")

var Schema = mongoose.Schema

var ArticleSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
})

var Article = mongoose.model("Article", ArticleSchema)

module.exports = Article;