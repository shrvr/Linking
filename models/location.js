const mongoose = require('mongoose');
const { Schema } = mongoose;

const locationSchema = new Schema({
    _user: Schema.Types.ObjectId,
    latitude: String,
    longitude: String
});

mongoose.model('locations', locationSchema);