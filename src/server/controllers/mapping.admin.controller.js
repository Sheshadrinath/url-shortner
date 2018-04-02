const express = require('express');
const router = express.Router();
const q = require('q');
const service = require('../services/mapping.admin.service');

router.post('/add', addNewUrlMapping);
router.put('/edit', editExistiingUrlMapping);
router.delete('/:key', deleteExistingUrlMapping);

function addNewUrlMapping(req, res) {

    if (!req.body || !req.body.value) {
        return res.status(400).send('Invalid data!!');
    }
    if (req.body.expiry && new Date(req.body.expiry) < new Date()) {
        return res.status(400).send('Expiry date cannot be previous');
    }

    service.addNewUrlMapping(req.body)
            .then(function(result) {
                if (result)
                    res.status(201).send('http://localhost:3000/' + result[0].key); //TODO: Return host name by resolving in code.
                else 
                    res.status(500).send('Error while adding new mapping');
            });
}

function editExistiingUrlMapping(req, res) {

    if (!req.body || !req.body.value) {
        return res.status(400).send('Invalid data!!');
    }
    if (req.body.expiry && new Date(req.body.expiry) < new Date()) {
        return res.status(400).send('Expiry date cannot be previous');
    }

    service.editExistiingUrlMapping(req.body)
            .then(function(result) {
                if (result)
                    res.status(200).send('Updated mapping successfully!!');
                else 
                    res.status(500).send('Error while updating mapping');
            });
}

function deleteExistingUrlMapping(req, res) {
    service.deleteExistingUrlMapping(req.params.key)
            .then(function(result) {
                if (result)
                    res.status(200).send('Removed mapping successfully!!');
                else 
                    res.status(500).send('Error while updating mapping');
            });
}

module.exports = router;