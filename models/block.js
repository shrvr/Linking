const mongoose = require('mongoose');
const { Schema } = mongoose;

const blockSchema = new Schema({
    from: {
        type: String,
        required: true,
        trim: true,
    },
    to: {
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