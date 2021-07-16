const router = require('express').Router();
const auth = require('../middleware/auth');
module.exports = router;

const mongoose = require('mongoose');

const Block = mongoose.model('block');

router.post('/block', auth, async (req, res) => {

    const { recieverId, statusCheck } = req.body;
    const { _user } = req.body._id;

    const block = new Block({
        _user,
        recieverId,
        statusCheck,
    });

    try {
        await block.save().then(response => { res.send("User Blocked"); });
    } catch (err) {
        res.status(422).send(err);
    }
});