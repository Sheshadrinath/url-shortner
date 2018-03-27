const config = require('../config/config.json');
const express = require('express');
const router = express.Router();
const service = require('../services/mapping.service');

//routes
router.get('/urls', getAllUrlMappings);
router.get('/:_id', getUrlMapping);
router.post('/add', addUrlMapping);
router.put('/:_id', editUrlMapping);
router.delete('/:_id', deleteUrlMapping);

function getAllUrlMappings(req, res) {
    service.getAllMappings()
    .then(function(result) {
        console.log('Data received at controller');
        res.status(200).json(result);
    });
}

function getUrlMapping(req, res) {
    console.log(req.params._id);
    service.getAMapping(req.params._id)
            .then(function(result) {
                console.log('Data received at controller');
                res.status(200).send(result);
            });
}

function addUrlMapping(req, res) {
    res.status(201).send("Added new mapping");
}

function editUrlMapping(req, res) {
    res.status(200).send("Updated existing mapping");
}

function deleteUrlMapping(req, res) {
    res.status(200).send("Deleted existing mapping");
}

module.exports = router;