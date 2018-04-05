const config = require('../config/config.json');
const mongoose = require('mongoose');
const Auditing = require('../models/audit.model');

mongoose.connect(config.connectionString);
mongoose.Promise = global.Promise;
mongoose.connection.once('open', function() {
    console.log('Audit service started');
});

var service = {};
service.auditLog = auditLog;

function auditLog(req, url) {
    Auditing.insertMany({
        url: url,
        requestor: req.connection.remoteAddress,
        date: new Date()
    });
}

module.exports = service;