const Following = require("../../model/Following");

module.exports.addFollowing = async (req, res)=>{
    const {friendId} = req.body;
    try{
        const currentUser = await Following.findById(req.userId);
        // can add condition for dublicate value;
        currentUser.following.push({friendId});
        
        await currentUser.save();
        res.send({msg:"done adding"});
    }catch(err){
        res.send({error:"error", err});
    }
}

module.exports.removeFollowing = async (req, res)=>{
    const {friendId} = req.body;
    try{
        const currentUser = await Following.findById(req.userId);
        currentUser.following = currentUser.following.filter(fl=> !(fl.friendId === friendId) );
        await currentUser.save();
        res.send({msg:"successfully removed"});
    }catch(err){
        res.send({error:"error", err});
    }}
