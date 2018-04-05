const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var AuditLogSchema = new Schema({
    url: { type: String, required: true },
    requestor: { type: String, require: true },
    date: { type: Date, require: true }
});

module.exports = mongoose.model('AuditLog', AuditLogSchema);
