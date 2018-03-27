const express = require('express');
const router = express.Router();
const _ = require('lodash');
const mappingContent = require('../mapping.json');
const fs = require('fs');

router.get('/', function(req, res) {
    var queryString = req.url;
    _.filter(mappingContent.mappings, function(map) {
        var requestUrl = req.url.replace('/?q=', '');
        if (map.from.indexOf(requestUrl) > -1) {
            res.status(301).redirect(map.to);
            return;
        }
    });
    res.status(404).send('Page Not Found!!');
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