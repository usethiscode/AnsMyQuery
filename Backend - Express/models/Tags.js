const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagsSchema = new Schema({
    tagname: String,
    questions: Array
})

module.exports = mongoose.model("Tags",TagsSchema)