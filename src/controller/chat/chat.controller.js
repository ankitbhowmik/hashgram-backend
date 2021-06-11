const Chat = require("../../model/Chat");
const User = require("../../model/User");

module.exports.createChat = async (req, res) => {
    const { profileId } = req.body;
    try {
        const newChat = await Chat.create({ members: [profileId, req.userId] });
        const thatUser = await User.findOne({ _id: profileId }).select("fullname email profileImage")
        thatUser._doc.chat_id = newChat._id;
        res.send({ msg: "success", friend: thatUser, chatId: newChat._id, });
    } catch (err) {
        res.send({ msg: "fail" });
    }
}

module.exports.getChats = async (req, res) => {
    const chatsIds = await Chat.find({ members: { $in: [req.userId] } });
    const friendIds = [], chat_ids_arr = [];

    chatsIds.forEach(chat => {
        const friend = chat.members.find((member) => member !== req.userId);
        friendIds.push(friend);
        chat_ids_arr.push(chat._id.toString());
    });
    //getting all user[] info based on friendIds array.
    const users = await User.find({ _id: { $in: friendIds } }).select("fullname email profileImage");

    const chats = users.map((data, index) => ({ ...data._doc, chatId: chat_ids_arr[index] }));
    res.json({ msg: "success", chats })
}

module.exports.getMessages = async (req, res) => {
    const { chatId } = req.body;
    const chats = await Chat.findOne({ _id: chatId });
    const receiverId = chats.members.find(user => user.toString() !== req.userId);
    res.send({ msg: "success", chat: chats.chat, receiverId });
}

module.exports.sendMessage = async (req, res) => {
    const { msg, chatId } = req.body;
    const conversation = await Chat.findOne({ _id: chatId });
    conversation.chat.unshift({ from: req.userId, msg, seen: false });
    await conversation.save();
    // res.send({ msg: "success", message: { from: req.userId, msg, seen: false } });
    res.send({ msg: "success", message: conversation.chat[0] });
}
