const User = require("../../model/User");

module.exports.editProfile = async (req, res) => {
    const { fullname, email, bio } = req.body;
    try {
        const thatUser = await User.findByIdAndUpdate(req.userId, { fullname, email, bio });
        res.json({ msg: "success", fullname, email, bio })
    } catch (err) {
        res.status(302).json({ msg: "fail", error: err });
    }
}

module.exports.getProfileData = async (req, res) => {
    let { profileId } = req.params;
    profileId = profileId ? profileId : req.userId;
    const thatUser = await User.findOne({ _id: profileId }).select("email fullname profileImage bio posts followers followings");
    thatUser._doc.followings = thatUser._doc.followings.length;
    thatUser._doc.followers = thatUser._doc.followers.length;
    thatUser._doc.posts = thatUser._doc.posts.length;
    delete thatUser._doc.password;
    res.send({ msg: "success", data: thatUser });
}


module.exports.uploadProfileImage = async (req, res) => {
    const profileImage = `/uploads/profile/${req.file.filename}`;
    try {
        const thatUser = await User.findByIdAndUpdate(req.userId, { profileImage });
        res.json({ msg: "success", image: profileImage });
    } catch (err) {
        res.status(302).json({ msg: "fail" });
    }
}