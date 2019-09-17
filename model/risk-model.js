const mongoose = require('mongoose');

const riskSchema = mongoose.Schema({
    projectID: {type: String},
    kind: {type: String, default: null},
    type: {type: String, default: null},
    probability: {type: String, default: null},
    consequence: {type: String, default: null},
    description: {type: String, default: null},
    prevSupp: {type: String, default: null},
    corrective: {type: String, default: null},
    occurred: {type: Boolean, default: false}
});

module.exports = mongoose.model('Risk', riskSchema);