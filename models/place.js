const mongoose = require('mongoose');
const { Schema } = mongoose;

const placeSchema = new Schema({
    _user: Schema.Types.ObjectId,
    latitude: String,
    longitude: String,
    date: Date,
});

mongoose.model('places', placeSchema);