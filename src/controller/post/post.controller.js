const User = require("../../model/User");
const Post = require("../../model/Post");

module.exports.upload = async (req, res) => {
	const { caption } = req.body;
	const image = `/uploads/posts/${req.file.filename}`;
	try {
		const newPost = await Post.create({ image, caption, author: req.userId });
		const thatUser = await User.findOne({ _id: req.userId });
		thatUser.posts.unshift(newPost._doc._id);
		await thatUser.save();
		res.send({ msg: "success", newPost });
	} catch (err) {
		res.status(302).json({ msg: "fail" });
	}
}

module.exports.getUserPosts = async (req, res) => {
	try {
		const userPosts = await User.findOne({ _id: req.userId }).select("posts").populate("posts").exec();
		res.send({ msg: "success", posts: userPosts });
	} catch (err) {
		res.send({ msg: "fail" })
	}
}

module.exports.getHomePosts = async (req, res) => {
	//user id : req.userId;
	try {
		const homePosts = await Post.find()
							.sort({ $natural: -1 })
							.populate({ path: "author", select: "profileImage fullname email" })
							.populate({ path: "comments.user", select: "profileImage fullname"})
							.limit(10);
		res.send({ msg: "success", homePosts });
	} catch (err) {
		res.send({ msg: "some server error" });
	}
}

module.exports.changeLike = async (req, res) => {
	const { postId } = req.body;
	let like = true;
	try {

		const changePost = await Post.findOne({ _id: postId });
		const userIdIndex = changePost.likes.indexOf(req.userId);
		if (userIdIndex === -1) {
			changePost.likes.push(req.userId);
		} else {
			like = false;
			changePost.likes.splice(userIdIndex, 1);
		}
		await changePost.save()
		res.json({ msg: "success", like });
	} catch (err) {
		res.json({ msg: "fail" });
	}
}

module.exports.addComment = async (req, res) => {
	const { post_id, comment } = req.body;
	try{
		const changePost = await Post.findOne({ _id: post_id });
		changePost.comments.push({ user: req.userId, comment });
		await changePost.save();
		const userInfo = await User.findOne({_id: req.userId}).select("profileImage fullname");
		res.json({ msg: "success", data:{ user: userInfo, comment } });
	}catch(err){
		res.json({msg: "fail"});
	}
}

