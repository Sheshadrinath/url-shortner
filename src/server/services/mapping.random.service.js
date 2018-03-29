
const mongoose = require('mongoose');
const q = require('q');
const bodyParser = require('body-parser');
const config = require('../config/config.json');

var Mapping = require('../models/Mapping.model');

mongoose.connect(config.connectionString);
mongoose.Promise = global.Promise;
mongoose.connection.once('open', function() {
    console.log('Mongoose connection established from mapping.random.service.js');
});

var service = {};

service.getShortUrl = getShortUrl;

function getShortUrl() {
    var randomText = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
        randomText += possible.charAt(Math.floor(Math.random() * possible.length));

    var mappingExists = false;
    Mapping.find({key: randomText})
            .exec(function(err, result) {
                if (err) throw err;
                else {
                    mappingExists = result.length > 0 ? false: true;
                    if (mappingExists)
                        getShortUrl();
                }
            });
    return randomText;
}

module.exports = service;