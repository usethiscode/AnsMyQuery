const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    title: String,
    ques: String,
    tags: Array,
    asked_user: String
})

module.exports = mongoose.model("Question",QuestionSchema)