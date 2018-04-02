const config = require('../config/config.json');
const q = require('q');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');

var Mapping = require('../models/Mapping.model');

mongoose.connect(config.connectionString);
mongoose.Promise = global.Promise;
mongoose.connection.once('open', function() {
    console.log('Mongoose connection established from mapping.admin.service.js');
});

var service = {};

service.addNewUrlMapping = addNewUrlMapping;
service.editExistiingUrlMapping = editExistiingUrlMapping;
service.deleteExistingUrlMapping = deleteExistingUrlMapping;

async function addNewUrlMapping (mapping) {
    var deferred = q.defer();

    var foundItemByKey = await findItemByKey(mapping);
    var foundItemByVal = await findItemByValue(mapping);

    if (foundItemByKey.length == 0 && foundItemByVal.length == 0) {
        Mapping.insertMany(mapping, function(insertError, status) {
            if (insertError) deferred.reject(insertError);
            else {
                deferred.resolve(status);
            }
        });
    } else {
        var result = [];
        if (foundItemByKey.length > 0 && foundItemByKey[0].key) result.push(foundItemByKey[0]);
        if (foundItemByVal.length > 0 && foundItemByVal[0].key) result.push(foundItemByVal[0]);
        deferred.resolve(result);
    }
    return deferred.promise;
}

function findItemByKey(mapping) {
    return new Promise((resolve, reject) => {
        Mapping.find({key: mapping.key})
            .exec(function(err, result) {
                if (err) reject(err);
                else {
                    resolve(result);
                }
            });
    });
}

function findItemByValue(mapping) {
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

function editExistiingUrlMapping (mapping) {
    var deferred = q.defer();

    Mapping.findOneAndUpdate({key: mapping.key}, mapping, null, function(err, result) {
        if (err) deferred.reject(err);
        else {
            deferred.resolve(result);
        }
    });

    return deferred.promise;
}

function deleteExistingUrlMapping (id) {
    var deferred = q.defer();

    Mapping.findOneAndRemove({key: id}, function(err, result) {
        if (err) deferred.reject(err);
        else {
            deferred.resolve(result);
        }
    })

    return deferred.promise;
}

module.exports = service;