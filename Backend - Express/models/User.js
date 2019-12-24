const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userId: String,
    name: String,
    password: String
})

module.exports = mongoose.model("User",UserSchema)