let users = []

addUser = (userId, socketId) => {
    if(users.some(user => user.userId === userId)) {
        const index = users.findIndex(user => user.userId === userId);
        users[index].socketId = socketId;
    } else {
        users.push({ userId, socketId });
    }
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
            addUser(userId, socket.id);
            io.emit("getUsers", users)
        })

        //send message
        socket.on("sendMessage", ({ senderId, receiverId, text }) => {
            console.log(users)
            console.log(receiverId);
            const user = getUser(receiverId);
            console.log(user)
            if(user !== undefined) {
                io.to(user.socketId).emit("getMessage", {
                    senderId,
                    text
                })
            }
        })

        //user disconnected
        socket.on("disconnect", () => {
            console.log("user disconnected");
            removeUser(socket.id);
            io.emit("getUsers", users);
        })
    });
}