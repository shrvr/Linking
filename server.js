const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const compression = require('compression');
const keys = require('./config/keys');

require('./models/user');
require('./models/place');
require('./models/location');
require('./models/chat');
mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const PORT = process.env.PORT || 80;
const api = require('./api');

const app = express();
app.use(cors());
app.use(compression());
app.use(express.json());

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use('/api', api);

app.listen(PORT, () => {
    console.log(`Server running on at http://localhost:${PORT}`);
});
