const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const followingSchema = new Schema({
    _id: Schema.ObjectId,
    following: [ {friendId: String} ]
}, {_id:false})

module.exports = mongoose.model("following", followingSchema);