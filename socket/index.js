let users = []

addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId)
        && users.push({ userId, socketId });
}

removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}

getUser = (userId) => {
    return users.find(user => user.userId === userId);
}

module.exports = (io) => {
    io.on('connection', (socket) => {
        //user connected
        console.log("user connected");

        //add user to socket list
        socket.on("addUser", (userId) => {
            addUser(userId);
            io.emit("getUsers", users)
        })

        //send message
        socket.on("sendMessage", ({ senderId, receiverId, text }) => {
            const user = getUser(receiverId);
            io.to(user.socketId).emit("getMessage", {
                senderId,
                text
            })
        })

        //user disconnected
        socket.on("disconnect", () => {
            console.log("user disconnected");
            removeUser(socket.id);
            io.emit("getUsers", users);
        })
    });
}