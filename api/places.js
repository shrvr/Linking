const router = require('express').Router();
module.exports = router;

const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const Place = mongoose.model('places');
const User = mongoose.model('users');

router.post('/add', auth, async (req, res) => {
    const { name, longitude, latitude } = req.body;
    const _user = req.body._id
    const place = new Place({
        _user,
        name,
        longitude,
        latitude
    });

    try {
        await place.save().then(response => { res.send("place added"); });
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
        await Place.findById(_trip)
            .then(async response => {
                await Place.find({ name: response.name, longitude: response.longitude, latitude: response.latitude })
                    .then(async resp => {
                        let users = [];
                        resp.map(async val => {
                            await User.findOne({ _id: val._user }).then(details => {
                                const block = await Block.find({ from: req.user._id })
                                if (block)
                                    if (res.statusCheck) {
                                        if (details._id != res.to) {
                                            users.push(details);
                                        }
                                    } else {
                                        users.push(details);
                                    }
                                else
                                    users.push(details);
                            })
                        })
                        res.send(users)
                    })
            })
    } catch (err) {
        res.status(422).send(err);
    }
});
/*
const { _trip } = req.query;
    try {
        await Place.findById(_trip)
            .then(async response => {
                await Place.find({ name: response.name, longitude: response.longitude, latitude: response.latitude })
                    .then(async resp => {
                        let users = [];
                        resp.map(async val => {
                            await User.findOne({ _id: val._user }).then(details => {
                                users.push(details);
                            })
                        })
                        res.send(users)
                    })
            })
    } catch (err) {
        res.status(422).send(err);
    }
    */