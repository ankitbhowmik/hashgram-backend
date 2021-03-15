const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const followerSchema = new Schema({
    _id: Schema.ObjectId,
    follower: [ {friendId: Schema.ObjectId} ]
}, {_id:false})

module.exports = mongoose.model("follower", followerSchema);