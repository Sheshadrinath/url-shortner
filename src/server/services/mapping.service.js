const config = require('../config/config.json');
const _ = require('lodash');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const q = require('q');

var Mapping = require('../models/Mapping.model');

mongoose.connect(config.connectionString);
mongoose.Promise = global.Promise;
mongoose.connection.once('open', function() {
    console.log('Connection established successfully!!');
});

var service = {};

service.getAllMappings = getAllMappings;
service.getAMapping = getAMapping;

function getAllMappings() {

    var deferred =  q.defer();

    Mapping.find({})
    .exec(function(err, maps) {
        if (err) deferred.reject(err);
        else {
            console.log(maps);
            deferred.resolve(maps);
        }
    });
    return deferred.promise;
}

function getAMapping(key) {
    var deferred = q.defer();

    Mapping.findOne({key: key})
            .exec(function(err, map) {
                if (err) deferred.reject(err);
                else {
                    deferred.resolve(map);
                }
            });
    return deferred.promise;
}

module.exports = service;