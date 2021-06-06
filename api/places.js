const router = require('express').Router();
module.exports = router;

const mongoose = require('mongoose');

const Place = mongoose.model('places');
const User = mongoose.model('users');

router.post('/add', async (req, res) => {
    const { _user, longitude, latitude, date } = req.body;
    const place = new Place({
        _user,
        longitude,
        latitude,
        date
    });

    try {
        await place.save().then(response => { res.send("place added"); });
    } catch (err) {
        res.status(422).send(err);
    }
});

router.get('/upcoming', async (req, res) => {
    const { _user } = req.query;
    const currentDate = new Date();
    try {
        await Place.find({ _user }, { date: { $gte: currentDate } })
            .then(response => {
                res.send(response)
            })
    } catch (err) {
        res.status(422).send(err);
    }
});

router.get('/previous', async (req, res) => {
    const { _user } = req.query;
    const currentDate = new Date();
    try {
        await Place.find({ _user }, { date: { $lt: currentDate } })
            .then(response => {
                res.send(response)
            })
    } catch (err) {
        res.status(422).send(err);
    }
});

router.get('/usersbyTripId', async (req, res) => {
    const { _trip } = req.query;
    try {
        await Place.findById(_trip)
            .then(async response => {
                await Place.find({ longitude: response.longitude, latitude: response.latitude, date: response.date })
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
});
