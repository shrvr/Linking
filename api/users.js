const router = require('express').Router();
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
module.exports = router;

const mongoose = require('mongoose');

const User = mongoose.model('users');

router.get('/signIn', async (req, res, next) => {
    const { userId, password } = req.query;
    try {
        const user = await User.findOne({ userId });
        if (!user) {
            throw new Error('Enter correct email address or password');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Enter correct email address or password');
        }
        const token = await user.generateAuthToken();

        res.send({ _user: token });
    } catch (err) {
        console.log(err);
        res.status(401).send({ messages: err.message });
    }
});

router.post('/signUp', async (req, res, next) => {
    const { firstName, lastName, userId, password, age, terms, mobile } =
        req.body;
    const user = new User({
        firstName,
        lastName,
        userId,
        password,
        age,
        terms,
        mobile,
    });

    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.send({ _user: token });
    } catch (err) {
        next(err);
    }
});

router.get('/get', auth, async (req, res) => {
    try {
        res.send(req.user);
    } catch (err) {
        next(err);
    }
});

router.post('/edit', auth, async (req, res, next) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['password', 'mobile', 'age'];
    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
    );

    try {
        if (!isValidOperation) {
            res.status(400).send({ messages: 'Invalid updates' });
        }
        updates.forEach((update) => (req.user[update] = req.body[update]));
        await req.user.save();
        res.send({ _user: req.token });
    } catch (error) {
        next(error);
    }
});

router.post('/delete', auth, async (req, res, next) => {
    try {
        await req.user.remove().then((response) => {
            res.json('User removed');
        });
    } catch (err) {
        next(err);
    }
});

router.get('/IdFromUserId', async (req, res) => {
    const { userId } = req.query;
    try {
        await User.findOne({ userId }).then((response) => {
            res.send(response._id);
        });
    } catch (err) {
        res.status(422).send(err);
    }
});
