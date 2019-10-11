const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    taskID: {type: String, default: null},
    taskName: {type: String, default: null},
    resource: {type: String, default: null},
    startDate: {type: Date, default: null},
    endDate: {type: Date, default: null},
    duration: {type: Number, default: null},
    percentComplete: {type: Number, default: null},
    dependencies: {type: String, default: null},
    projectID: {type: String, default: null},
    ignoreWeekends: {type: Boolean, default: false}
});

module.exports = mongoose.model('Task', taskSchema);