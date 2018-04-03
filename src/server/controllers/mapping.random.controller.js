const config = require('../config/config.json');
const express = require('express');
const router = express.Router();
const service = require('../services/mapping.random.service');

//routes
router.post('/generate', getShortUrl);

function getShortUrl(req, res) {
    var result = service.getShortUrl(req.body)
                .then(function(result) {
                    if (result)
                        res.status(200).json(result);
                    else
                        res.send(200).send('Could not generake key');
                });
}

module.exports = router;