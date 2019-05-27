const mongoose = require('mongoose');


const ganttConfig = [
    { type: 'string', label: 'Task ID' },
    { type: 'string', label: 'Task Name' },
    { type: 'date', label: 'Start Date' },
    { type: 'date', label: 'End Date' },
    { type: 'number', label: 'Duration' },
    { type: 'number', label: 'Percent Complete' },
    { type: 'string', label: 'Dependencies' },
];

const projectSchema = mongoose.Schema({
   name: String,
   description: String,
   owner: String,
   projectNumber: String,
   tags: [String],
   meta:{
       createdAt: Date,
       updatedAt: Date,
       createdBy: String,
       updatedBy: String
   },
   permissions: [{
       owner: [String],
       contributors: [String],
       viewer: [String]
   }],
   ganttChart: []
});

module.exports = mongoose.model('Project', projectSchema);