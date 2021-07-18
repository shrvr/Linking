const router = require('express').Router();
module.exports = router;

const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const Place = mongoose.model('places');
const User = mongoose.model('users');
const Block = mongoose.model('blocks');

router.post('/add', auth, async (req, res) => {
    const { name, longitude, latitude, vicinity } = req.body;
    const _user = req.user._id
    try {
        const place = await Place.findOne({ _user, longitude, latitude })
        if (place) res.status(200).send("place already exists");
        else {
            const place = new Place({
                _user,
                name,
                longitude,
                latitude,
                vicinity
            });
            await place.save().then(response => { res.status(200).send("place added"); });
        }
    }
    catch (err) {
        res.status(422).send(err);
    }
});

router.post('/toggleShare', auth, async (req, res) => {
    const { _trip, share } = req.body;
    try {
        await Place.findByIdAndUpdate(_trip, { share })
            .then(response => {
                res.send("updated")
            })
    } catch (err) {
        res.status(422).send(err);
    }
});

router.post('/delete', auth, async (req, res) => {
    const { _trip } = req.body;
    try {
        await Place.findByIdAndDelete(_trip)
            .then(response => {
                res.send("Trip deleted successfully")
            })
    } catch (err) {
        res.status(422).send(err);
    }
});

router.get('/all', auth, async (req, res) => {
    try {
        await Place.find({ _user: req.user._id })
            .then(response => {
                res.send(response)
            })
    } catch (err) {
        res.status(422).send(err);
    }
});

router.get('/usersbyTripId', auth, async (req, res) => {
    const { _trip } = req.query;
    try {
        const blocks = await Block.find({ $or: [{ from: req.user._id }, { to: req.user._id }] })
        const response = await Place.findById(_trip)
        const resp = await Place.find({ name: response.name, longitude: response.longitude, latitude: response.latitude, share: true })
        let users = [];
        for (let i = 0; i < resp.length; i++) {
            let details = await User.findOne({ _id: resp[i]._user })
            if (details._id.toString() === req.user._id.toString())
                continue;

            let block = blocks.filter(ele => (ele.to == details._id.toString() || ele.from == details._id.toString()) && ele.statusCheck == true);
            if (block.length > 0) {
                continue;
            }
            else
                users.push(details);
        }
        res.send(users);
    } catch (err) {
        res.status(422).send(err);
    }
});