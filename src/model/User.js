const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
    },
     fullname:{
        type: String,
        required: [true, "fullname is required"]
    },
    username:{
        type: String,
        required: [true, "name is required"],
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    profileImage: {
        type:String,
        default:""
    }
})

userSchema.statics.login = async function(email, password) {
    const theUser = await this.findOne({email});
    if(theUser){
        const match = await bcrypt.compare(password, theUser.password);
        if(match) return theUser;
        throw new Error("INCORRECT PASSWORD");
    }
    throw new Error("INVALID EMAIL ADDRESS");
}

module.exports = mongoose.model('user', userSchema);
