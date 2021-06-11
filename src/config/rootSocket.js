function rootSocket(io) {
    io.on("connection", (socket) => {

        socket.on("add-user", (userId) => {
            addUser(userId, socket.id);
        });

        socket.on("send-message", ({ receiverId, chatId, message }) => {
            const receiver = socketUsers.find(user => user.userId === receiverId);
            if (receiver?.socketId) io.to(receiver.socketId).emit("send-message", { chatId, message });
        });

        socket.on("disconnect", () => {
            removeUser(socket.id)
        })
    });
}

let socketUsers = [];

const removeUser = (socketId) => {
    socketUsers = socketUsers.filter(user => user.socketId !== socketId);
    console.log("removing user ", socketUsers);
}

const addUser = async (userId, socketId) => {
    console.log("adding user", userId)
    const userPresent = socketUsers.some(user => user.userId === userId);
    if (!userPresent) socketUsers.push({ userId, socketId });
}

module.exports = rootSocket;