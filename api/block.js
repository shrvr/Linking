const router = require('express').Router();
const auth = require('../middleware/auth');
module.exports = router;

const mongoose = require('mongoose');

const Block = mongoose.model('blocks');

router.post('/block', auth, async (req, res) => {
    const { to, statusCheck } = req.body;
    try {
        const block = await Block.findOne({ from: req.user._id, to, });
        if (block) {
            const response = await Block.findByIdAndUpdate(block._id, { statusCheck })
            res.status(200).json(response);
        }
        else {
            const block = new Block({
                from: req.user._id,
                to,
                statusCheck,
            });
            const response = await block.save();
            res.status(200).json(response);
        }
    }
    catch (err) {
        res.status(422).send(err);
    }
});