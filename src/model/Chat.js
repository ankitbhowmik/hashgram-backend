const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mainChatSchema = new Schema({
    friendId: Schema.ObjectId,
    //if the friendId "from" message then sent will be false 
    //if the userId "from" message then sent will be true
    messages: [{from:boolean, msg:String}]
})

const chatSchema = new Schema({
    userId: Schema.ObjectId,
    chat: [mainChatSchema]
})

module.exports = mongoose.model('chat', chatSchema);