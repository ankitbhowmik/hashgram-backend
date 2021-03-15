const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mainPostSchema = new Schema({
    image: String,
    likes: Number,
    comments: [{userId: Schema.ObjectId, cmnt: String}],
    caption: String,
})

const postSchema = new Schema({
    _id: Schema.ObjectId,
    post: [mainPostSchema]
}, {_id:false})

module.exports = mongoose.model('post', postSchema);