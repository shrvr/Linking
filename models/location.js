const mongoose = require('mongoose');
const { Schema } = mongoose;

const locationSchema = new Schema({
    _user: Schema.Types.ObjectId,
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
});

mongoose.model('locations', locationSchema);