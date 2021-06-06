const router = require('express').Router();
module.exports = router;

const mongoose = require('mongoose');

const Chat = mongoose.model('chats');

router.post('/add', async (req, res) => {
    const { _user, targetUser, body } = req.body;
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

router.get('/get', async (req, res) => {
    const { _user, targetUser } = req.query;

    try {
        await Chat.find({ _user, targetUser }).then(response => { res.send(response); });
    } catch (err) {
        res.status(422).send(err);
    }
});