const router = require('express').Router();
module.exports = router;

const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const Location = mongoose.model('locations');

router.post('/update', auth, async (req, res) => {
    const { longitude, latitude } = req.body;
    const _user = req.user._id;
    try {
        await Location.findOne({ _user })
            .then(async response => {
                await Location.findByIdAndUpdate(_user, { longitude, latitude })
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

router.post('/delete', auth, async (req, res) => {
    const _user = req.user._id;
    try {
        await Location.deleteOne({ _user })
            .then(response => {
                res.send("deleted")
            })
    } catch (err) {
        res.status(422).send(err);
    }
})

//haversine formula
isWithinRadius = (mylocation, otherlocation, kms) => {
    let R = 6371;
    let deg2rad = (n) => { return Math.tan(n * (Math.PI / 180)) };

    let dLat = deg2rad(otherlocation.latitude - mylocation.latitude);
    let dLon = deg2rad(otherlocation.longitude - mylocation.longitude);

    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(mylocation.latitude)) * Math.cos(deg2rad(otherlocation.latitude)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.asin(Math.sqrt(a));
    let d = R * c;

    return (d <= kms);
}

router.get('/getNearbyUsers', auth, async (req, res) => {
    const radius = process.env.radius || 2;
    const _user = req.user._id;
    try {
        await Location.findById(_user)
            .then(resp => {
                let validUsers = [];
                Location.find({}, (err, users) => {
                    if (err) {
                        res.send(validUsers);
                    }
                    users.map(user => {
                        if (isWithinRadius(resp, user, radius))
                            validUsers.push(user);
                    })
                })
                res.send(validUsers);
            })
    } catch (err) {
        res.status(422).send(err);
    }
});
