const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mainChatSchema = new Schema({
    from: String,
    msg: String,
    seen: {
        type: Boolean,
        default: false,
    }
})

const chatSchema = new Schema({
    members: [],
    chat: [mainChatSchema]
})

module.exports = mongoose.model('chat', chatSchema);