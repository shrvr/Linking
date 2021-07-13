const router = require('express').Router();
module.exports = router;

const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const Conversation = mongoose.model('conversation');

router.post('/', auth, async (req, res) => {
    const conversation = new Conversation({
        members: [req.user._id, req.body.receiverId]
    });
    try {
        const savedconv = await conversation.save();
        res.status(200).send(savedconv);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const conv = await Conversation.find({ members: { $in: [req.user._id] } });
        res.status(200).send(conv);
    } catch (err) {
        res.status(500).json(err);
    }
});