const User = require("../../model/User");

module.exports.editProfile = async (req, res) => {
    const {fullname, email, bio} = req.body;
    try{
        const thatUser = await User.findByIdAndUpdate(req.userId, {fullname, email, bio});
        res.json({msg: "success", fullname, email, bio})
    }catch(err){
        res.status(302).json({msg:"fail", error:err});
    }
}
