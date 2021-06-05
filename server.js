const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const keys = require('./config/keys');

const PORT = process.env.PORT || 8080;
// const api = require('./api');

const app = express();
app.use(cors());
app.use(compression());

app.get('/', (req, res) => {
    res.send("server working");
})

app.listen(PORT, () => {
    console.log(`Server running on at http://localhost:${PORT}`)
});
