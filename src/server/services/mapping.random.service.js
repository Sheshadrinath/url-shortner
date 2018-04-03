
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

async function getShortUrl(mapping) {
    var deferred = q.defer();

    var mappingExistsByUrl = await findMappingByUrl(mapping)
    if (mappingExistsByUrl && mappingExistsByUrl.length > 0) {
        deferred.resolve(mappingExistsByUrl);
    } else {
        var randomText = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
        for (var i = 0; i < 10; i++)
            randomText += possible.charAt(Math.floor(Math.random() * possible.length));
    
        var newMapping;
        Mapping.find({key: randomText})
                .exec(function(err, result) {
                    if (err) throw err;
                    else {
                        var mappingExists = result.length > 0 ? true: false;
                        if (mappingExists)
                            getShortUrl(mapping);
                        else {
                            newMapping = { 'key': randomText, 'value': mapping.value , 'expiry': new Date().setDate(new Date().getDate() + 1)};
                            Mapping.insertMany(newMapping);
                            deferred.resolve(newMapping);
                        }
                    }
                });
    }
    return deferred.promise;
}

function findMappingByUrl(mapping) {
    return new Promise((resolve, reject) => {
        Mapping.find({value: mapping.value})
            .exec(function(err, result) {
                if (err) reject(err);
                else {
                    resolve(result);
                }
            });
    });
}

module.exports = service;