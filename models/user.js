const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    userId: String,
    password: String,
    age: Number,
    mobile: {
        type: String,
        default: ""
    },
    terms: {
        type: Boolean,
        default: false
    }
});

mongoose.model('users', userSchema);