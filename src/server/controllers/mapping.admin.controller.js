const express = require('express');
const router = express.Router();
const q = require('q');
const service = require('../services/mapping.admin.service');

router.post('/add', addNewUrlMapping);
router.put('/edit', editExistiingUrlMapping);
router.delete('/:key', deleteExistingUrlMapping);

function addNewUrlMapping(req, res) {
    service.addNewUrlMapping(req.body)
            .then(function(result) {
                if (result)
                    res.status(201).send('Added new mapping successfully!!');
                else 
                    res.status(500).send('Error while adding new mapping');
            });
}

function editExistiingUrlMapping(req, res) {
    service.editExistiingUrlMapping(req.body)
            .then(function(result) {
                if (result)
                    res.status(200).send('Updated mapping successfully!!');
                else 
                    res.status(500).send('Error while updating mapping');
            });
}

function deleteExistingUrlMapping(req, res) {
    console.log(req.params);
    service.deleteExistingUrlMapping(req.params.key)
            .then(function(result) {
                if (result)
                    res.status(200).send('Removed mapping successfully!!');
                else 
                    res.status(500).send('Error while updating mapping');
            });
}

module.exports = router;