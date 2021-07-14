const router = require('express').Router();
module.exports = router;

const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const Chat = mongoose.model('chats');

router.get('/latest', auth ,async (req, res) => {
    try {
        const chats = await Chat.find({
            conversationId: req.query.conversationId
        }).sort({_id:-1}).limit(1);
        res.status(200).json(chats);
    } catch (err) {
        res.status(500).json(err);
    }
});

// router.post('/add', auth, async (req, res) => {
//     const { targetUser, body } = req.body;
//     const _user = req.user._id;
//     const date = new Date();
//     const chat = new Chat({
//         _user,
//         targetUser,
//         body,
//         date
//     });
//     try {
//         await chat.save().then(response => {
//             res.send("chat added");
//         })
//     } catch (err) {
//         res.status(422).send("chat not added");
//     }
// })

// router.get('/get', auth, async (req, res) => {
//     const { targetUser } = req.query;

//     try {
//         await Chat.find({ _user: req.user._id, targetUser }).then(response => { res.send(response); });
//     } catch (err) {
//         res.status(422).send(err);
//     }
// });

router.post('/', auth, async (req, res) => {
    const chat = new Chat(req.body);
    try {
        const newChat = await chat.save();
        res.status(200).json(newChat);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const chats = await Chat.find({
            conversationId: req.query.conversationId
        });
        res.status(200).json(chats);
    } catch (err) {
        res.status(500).json(err);
    }
});
