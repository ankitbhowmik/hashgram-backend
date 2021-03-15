const Follower = require("../../model/Followers");

module.exports.addFollower = async (req, res)=>{
    const {friendId} = req.body;
    try{
        const currentUser = await Follower.findById(req.userId);
        // can add condition for dublicate value;
        currentUser.follower.push({friendId});
        
        await currentUser.save();
        res.send({msg:"done adding"});
    }catch(err){
        res.send({error:"error", err});
    }
}

module.exports.removeFollower = async (req, res)=>{
    const {friendId} = req.body
    try{
        const currentUser = await Follower.findById(req.userId);
        currentUser.follower = currentUser.follower.filter(fl=> !(fl.friendId === friendId) );
        await currentUser.save();
        res.send({msg:"successfully removed"});
    }catch(err){
        res.send({error:"error", err});
    }
}
