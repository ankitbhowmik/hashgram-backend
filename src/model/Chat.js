const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mainChatSchema = new Schema({
    from: String,
    msg: String,
    seen: Boolean
})

const chatSchema = new Schema({
    users: [],
    chat: [mainChatSchema]
})

module.exports = mongoose.model('chat', chatSchema);