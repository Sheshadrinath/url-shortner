const config = require('../config/config.json');
const express = require('express');
const router = express.Router();
const service = require('../services/mapping.service');

//routes
router.get('/urls', getAllUrlMappings);
router.get('/:_id', getUrlMapping);

function getAllUrlMappings(req, res) {
    service.getAllMappings()
    .then(function(result) {
        res.status(200).json(result);
    });
}

function getUrlMapping(req, res) {
    service.getAMapping(req.params._id)
            .then(function(result) {
                if (result === null) {
                    res.status(200).send('Mapping not found');
                }
                res.status(200).send(result);
            });
}

module.exports = router;