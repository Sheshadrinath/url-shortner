
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MappingSchema = new Schema({
    key: { type: String, required: true, unique: true },
    value: { type: String, required: true, unique: true },
    expiry: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Mapping', MappingSchema);