const router = require('express').Router();
module.exports = router;

const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const haversine = require('haversine')
const Location = mongoose.model('locations');
const User = mongoose.model('users');

router.post('/update', auth, async (req, res) => {
    const { longitude, latitude } = req.body;
    const _user = req.user._id;
    try {
        const location = await Location.findOne({ _user })
        if (location) {
            await Location.findByIdAndUpdate(_user, { longitude, latitude })
                .then(response => {
                    res.send("location updated");
                });
        } else {
            const nwlocation = new Location({
                _user,
                longitude,
                latitude
            });
            await nwlocation.save().
                then(response => {
                    res.send("location added");
                });
        }
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
        const userlocation = await Location.findOne({ _user: _user });
        if (userlocation) {
            let validUsers = [];
            const alllocations = await Location.find({});
            for (let i = 0; i < alllocations.length; i++) {
                if (alllocations[i]._user.toString() === req.user._id.toString()) continue;
                if (haversine({ latitude: userlocation.latitude, longitude: userlocation.longitude },
                    { latitude: alllocations[i].latitude, longitude: alllocations[i].longitude }, { threshold: radius })) {
                    let location = haversine({ latitude: userlocation.latitude, longitude: userlocation.longitude },
                        { latitude: alllocations[i].latitude, longitude: alllocations[i].longitude })
                    let user = await User.findById(alllocations[i]._user);
                    validUsers.push({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        age: user.age,
                        distance: location
                    });
                }
            }
            res.status(200).send(validUsers);
        }
        else res.status(200).send([]);
    } catch (err) {
        res.status(422).send(err);
    }
});
