const config = require('../config/config.json');
const express = require('express');
const router = express.Router();
const service = require('../services/mapping.random.service');

//routes
router.get('/generate', getShortUrl);

function getShortUrl(req, res) {
    var result = service.getShortUrl();
    if (result)
        res.status(200).json(result);
    else
        res.send(200).send('Could not generake key');
}

module.exports = router;