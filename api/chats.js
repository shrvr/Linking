const router = require('express').Router();
module.exports = router;

const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const Chat = mongoose.model('chats');

router.post('/add', auth, async (req, res) => {
    const { targetUser, body } = req.body;
    const _user = req.user._id;
    const date = new Date();
    const chat = new Chat({
        _user,
        targetUser,
        body,
        date
    });
    try {
        await chat.save().then(response => {
            res.send("chat added");
        })
    } catch (err) {
        res.status(422).send("chat not added");
    }
})

router.get('/get', auth, async (req, res) => {
    const { targetUser } = req.query;

    try {
        await Chat.find({ _user: req.user._id, targetUser }).then(response => { res.send(response); });
    } catch (err) {
        res.status(422).send(err);
    }
});