const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    userId: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(val) {
            if (!validator.isEmail(val)) throw new Error('UserID invalid.');
        },
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    age: {
        type: Number,
        validate(val) {
            if (val < 18)
                throw new Error('Age must be greater than or equal to 18.');
        },
    },
    mobile: {
        type: String,
        trim: true,
        default: '',
    },
    terms: {
        type: Boolean,
        required: true,
        default: false,
    },
});

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

mongoose.model('users', userSchema);
