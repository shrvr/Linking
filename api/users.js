const router = require('express').Router();
module.exports = router;

const mongoose = require('mongoose');

const User = mongoose.model('users');

router.get('/signIn', async (req, res) => {
    const { userId, password } = req.query;
    try {
        await User.findOne({ userId, password })
            .then(response => {
                res.send({ _user: response._id })
            })
    } catch (err) {
        res.status(422).send("User not Found");
    }
})

router.post('/signUp', async (req, res) => {
    const { firstName, lastName, userId, password, age, terms, mobile } = req.body;
    const user = new User({
        firstName,
        lastName,
        userId,
        password,
        age,
        terms,
        mobile
    });

    try {
        await user.save().then(response => { res.send({ _user: response._id }); });
    } catch (err) {
        res.status(422).send(err);
    }
});

router.get('/get', async (req, res) => {
    const { _user } = req.query;

    try {
        await User.findById(_user)
            .then(response => {
                res.send(response)
            })
    } catch (err) {
        res.status(422).send(err);
    }
});

router.post('/edit', async (req, res) => {
    const { _user, password, mobile, age } = req.body;

    try {
        await User.findByIdAndUpdate(_user, { password, mobile, age }).then(response => {
            res.send({ _user: response._id });
        });
    } catch (err) {
        res.status(422).send(err);
    }
});

router.post('/delete', async (req, res) => {
    const { _user } = req.body;

    try {
        await User.findByIdAndRemove(_user).then(response => {
            res.json("User removed");
        });
    } catch (err) {
        res.status(422).send(err);
    }
});

router.get('/IdFromUserId', async (req, res) => {
    const { userId } = req.query;
    try {
        await User.findOne({ userId }).then(response => {
            res.send(response._id);
        });
    } catch (err) {
        res.status(422).send(err);
    }
});

router.get('/checkUnique', async (req, res) => {
    const { userId } = req.query
    try {
        await User.find({ userId }).then(response => {
            res.json({ canUse: false });
        });
    } catch (err) {
        res.status(200).json({ canUse: true });
    }
})