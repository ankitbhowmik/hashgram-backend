const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    image: String,
    caption: String,
    author:{type: Schema.Types.ObjectId, ref:"user"},
    likes: [{type: Schema.Types.ObjectId, ref:"user"}],
    comments: [{
    	user:{type: Schema.Types.ObjectId, comments: String , ref: "user"},
    	comment: String,
    }],
})

module.exports = mongoose.model('post', postSchema);


/** 
	populate this like  xyz.populate("comments.user").exec();
*/