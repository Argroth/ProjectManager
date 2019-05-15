const mongoose = require('mongoose');


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