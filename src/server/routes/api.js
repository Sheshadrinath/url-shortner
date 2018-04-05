const express = require('express');
const router = express.Router();
const _ = require('lodash');
const mappingContent = require('../mapping.json');
const fs = require('fs');
const mongoose = require('mongoose');
const config = require('../config/config.json');
const audit = require('../services/audit.service');

var Mapping = require('../models/Mapping.model');

mongoose.connect(config.connectionString);
mongoose.Promise = global.Promise;
mongoose.connection.once('open', function() {
    console.log('Mongoose connection established from api.js');
});

router.get('/:id', function(req, res) {
    var queryString = req.url;
    Mapping.findOne({key: req.params.id})
        .exec(function(err, result) {
            if (err) throw err;
            else {
                if (result) {
                    if (result.expiry && result.expiry > new Date()) {
                        audit.auditLog(req, result.value);
                        res.redirect(result.value);
                        return;
                    } else {
                        res.sendStatus(404);
                    }
                } else {
                    res.sendStatus(404);
                }
            }
        });
})

router.post('/', function(req, res) {
    var newmapping = req.body;
    var exists = _.find(mappingContent.mappings, function(item) {
        return item.from == newmapping.from;
    });

    if (!exists) {
        mappingContent.mappings.push(newmapping);

        fs.readFile('./mapping.json', 'utf-8', function(error, data) {
            if (error) throw error;

            console.log(mappingContent.mappings);
            fs.writeFile('./mapping.json', JSON.stringify(mappingContent, null, 4), 'utf-8', function(err) {
                if (err) throw err;
            })
        })

        console.log(mappingContent.mappings);
        res.status(201).send('Item added successfully!!');
    } else {
        console.log('Cannot add this mapping since the key already exists!!');
        res.status(500).send('Cannot add this mapping since the key already exists!!');
    }
});

router.put('/:from', function(req, res) {
    res.send('PUT functiond');
});

router.delete('/:from', function(req, res) {
    res.send('DELETE method');
});

module.exports = router;