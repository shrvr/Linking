const router = require('express').Router();
module.exports = router;

const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const Place = mongoose.model('places');
const User = mongoose.model('users');

router.post('/add', auth, async (req, res) => {
    const { name, longitude, latitude, vicinity } = req.body;
    const _user = req.body._id
    const place = new Place({
        _user,
        name,
        longitude,
        latitude,
        vicinity
    });

    try {
        await place.save().then(response => { res.send("place added"); });
    } catch (err) {
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
        const blocks = await Block.find({ from: req.user._id })
        await Place.findById(_trip)
            .then(async response => {
                await Place.find({ name: response.name, longitude: response.longitude, latitude: response.latitude, share: true })
                    .then(async resp => {
                        let users = [];
                        for (let i = 0; i < resp.length; i++) {
                            await User.findOne({ _id: resp[i]._user }).then(details => {
                                if (details._id == req.user._id)
                                    continue

                                let block = blocks.find(ele => ele.to = details._id)
                                if (block && block.statusCheck) {
                                    users.push(details);
                                }
                                else
                                    users.push(details);
                            })
                        }
                        res.send(users);
                    })
            })
    } catch (err) {
        res.status(422).send(err);
    }
});