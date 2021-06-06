const router = require('express').Router();
module.exports = router;

const mongoose = require('mongoose');

const Location = mongoose.model('locations');

router.post('/update', async (req, res) => {
    const { _user, longitude, latitude } = req.body;
    try {
        await Location.findOne({ _user })
            .then(async response => {
                await Location.findByIdAndUpdate(response._id, { longitude, latitude })
                    .then(response => {
                        res.send("location updated");
                    });
            })
            .catch(async err => {
                const location = new Location({
                    _user,
                    longitude,
                    latitude
                });
                await location.save().
                    then(response => {
                        res.send("location added");
                    });
            })
    } catch (err) {
        res.status(422).send(err);
    }
});

router.get('/getNearbyUsers', async (req, res) => {
    const { _user } = req.query;
});
