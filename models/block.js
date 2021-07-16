const mongoose = require('mongoose');
const { Schema } = mongoose;

const blockSchema = new Schema({
    _user: {
        type: String,
        required: true,
        trim: true,
    },
    recieverId: {
        type: String,
        required: true,
        trim: true,
    },
    statusCheck: {
        type: String,
        required: true,
        trim: ture,
    },
});

mongoose.model('block', blockSchema);