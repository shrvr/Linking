const mongoose = require('mongoose');
const { Schema } = mongoose;

const conversationSchema = new Schema({
    members: {
        type: Array,
    }
}, { timestamps: true });

mongoose.model('conversation', conversationSchema);