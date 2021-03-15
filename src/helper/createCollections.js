const Following = require("../model/Following");
const Followers = require("../model/Followers");
const Post = require("../model/Post");

const createCollections = async (_id)=>{ 
    await Following.create({_id});
    await Followers.create({_id});
    await Post.create({_id});
    console.log("create all collections for user ", _id);
}

const deleteCollections = async (_id)=>{
	await Following.findByIdAndDelete(_id);
    await Followers.findByIdAndDelete(_id);
    await Post.findByIdAndDelete(_id);
    console.log("deleted all collections for user ",_id)
}

module.exports = {createCollections, deleteCollections};