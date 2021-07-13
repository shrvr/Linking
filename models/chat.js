const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = new Schema({
    conversationId: {
        type: String
    },
    sender: {
        type: String
    },
    text: {
        type: String
    }
}, { timestamps: true });

mongoose.model('chats', chatSchema);