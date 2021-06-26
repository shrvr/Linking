const mongoose = require('mongoose');
const { Schema } = mongoose;

const placeSchema = new Schema({
    _user: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        trim: true,
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    vicinity: {
        type: String,
        required: true
    },
    share: {
        type: Boolean,
        default: true
    }
});

mongoose.model('places', placeSchema);