const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
    },
    fullname: {
        type: String,
        required: [true, "fullname is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    profileImage: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    onLine: {
        type: Boolean,
        default: false
    },
    posts: [{ type: Schema.Types.ObjectId, ref: "post" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "follower" }],
    followings: [{ type: Schema.Types.ObjectId, ref: "following" }],
})

userSchema.statics.login = async function (email, password) {
    const theUser = await this.findOne({ email });
    if (theUser) {
        const match = await bcrypt.compare(password, theUser.password);
        if (match) return theUser;
        throw new Error("INCORRECT PASSWORD");
    }
    throw new Error("INVALID EMAIL ADDRESS");
}

module.exports = mongoose.model('user', userSchema);
