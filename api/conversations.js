const router = require('express').Router();
module.exports = router;

const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const Conversation = mongoose.model('conversation');
const Block = mongoose.model('blocks');

router.post('/', auth, async (req, res) => {
    const conversation = new Conversation({
        members: [req.user._id, mongoose.Types.ObjectId(req.body.receiverId)]
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
        let blocks = await Block.find({ $or: [{ from: req.user._id }, { to: req.user._id }] })
        let map = new Map();
        blocks.forEach(ele => {
            if (ele.from.toString() === req.user._id.toString())
                map.set(ele.to.toString(), ele.statusCheck);
            else map.set(ele.from.toString(), ele.statusCheck);
        })
        let conv = await Conversation.find({ members: { $in: [req.user._id] } });
        for (let i = 0; i < conv.length; i++) {
            for (let j = 0; j < conv[i].members.length; j++) {
                if (map.has(conv[i].members[j].toString())) {
                    conv[i]._doc.blockStatus = map.get(conv[i].members[j].toString())
                }
                else {
                    conv[i]._doc.blockStatus = false
                }
            }
        }
        res.status(200).send(conv);
    } catch (err) {
        res.status(500).json(err);
    }
});
