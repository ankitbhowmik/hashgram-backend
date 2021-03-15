const bcrypt = require("bcryptjs");

module.exports.bcrypting = async (password)=>{
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
}