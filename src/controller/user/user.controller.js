const jwt = require("jsonwebtoken");
const User = require("../../model/User");

const { bcrypting } = require("../../helper/passwords");
const { signupErr } = require("../../helper/signupErr");

module.exports.signup = async (req, res) => {
    let { email, fullname, password } = req.body;
    password = await bcrypting(password);
    try {
        const newUser = await User.create({ email, fullname, password });
        res.json({ msg: "success", doc: newUser._doc });
    } catch (err) {
        const error = signupErr(err);
        res.json({ msg: "fail", error });
    }
}

const maxAge = 60 * 60 * 24 * 2;  //in seconds; 2days

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const theUser = await User.login(email, password);
        const token = jwt.sign({ id: theUser._id }, process.env.JWT_SECRET, { expiresIn: maxAge });
        res.cookie('authJwt', token, { maxAge: maxAge * 1000 });
        res.send({
            msg: "success",
            userId: theUser._id,
            email: theUser.email,
            fullname: theUser.fullname,
            profileImage: theUser.profileImage
        });
    } catch (err) {
        res.send({ msg: "fail", err: err.message });
    }
}

module.exports.logout = (req, res) => {
    res.clearCookie("authJwt");
    res.send({ msg: "success" });
}
module.exports.verifyToken = (req, res) => {
    const { authJwt } = req.cookies;
    if (authJwt) {
        jwt.verify(authJwt, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                res.json({ auth: "fail", msg: "not correct" });
                return;
            }
            try {
                const thatUser = await User.findById(decodedToken.id).select("email fullname profileImage bio posts followers followings");
                thatUser._doc.followings = thatUser._doc.followings.length;
                thatUser._doc.followers = thatUser._doc.followers.length;
                thatUser._doc.posts = thatUser._doc.posts.length;
                res.json({ auth: "success", data: thatUser });
            } catch (err) {
                res.json({ auth: "fail", msg: "database err" });
            }
        });
    } else {
        res.json({ auth: "fail", msg: "no jwt found" })
    }
}

module.exports.searchUser = async (req, res) => {
    let { search } = req.body;
    try {
        const users = await User.find({ $or: [{ fullname: { $regex: search } }, { email: { $regex: search } }] })
            .select("profileImage email fullname").limit(6);
        res.send(users);
    } catch (err) {
        res.status(404).send([])
    }
}

module.exports.updateUser = async (req, res) => {
    const { fullname, email, image } = req.body;
    try {
        const user = await User.findOne({ _id: req.userId })
        user.email = email;
        user.image = image;
        user.fullname = fullname;
        await user.save();
        res.send({ success: true, data: user });
    } catch (err) {
        res.status(302).send({ success: false, error: "server error" });
    }
}
