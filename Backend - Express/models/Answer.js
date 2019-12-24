const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
    ans: String,
    ques_id: String,
    answered_user: String,
    voteCount: Number,
    downvoters: Array,
    upvoters: Array
})

module.exports = mongoose.model("Answer",AnswerSchema)