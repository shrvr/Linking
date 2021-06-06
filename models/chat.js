const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = new Schema({
    _user: Schema.Types.ObjectId,
    targetUser: Schema.Types.ObjectId,
    body: String,
    date: Date,
});

mongoose.model('chats', chatSchema);