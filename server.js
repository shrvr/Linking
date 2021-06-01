const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const keys = require('./config/keys');

const PORT = process.env.PORT | 8080;
const api = require('./api');

const app = express();
app.use(cors());
app.use(compression());

app.get('/', (req, res) => {
    res.send("server working");
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`)
});
