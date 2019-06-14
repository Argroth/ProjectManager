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
   // projectName: String,
   // description: String,
   // owner: String,
   // projectNumber: String,
   // tags: [String],
   // meta:{
   //     createdAt: Date,
   //     updatedAt: Date,
   //     createdBy: String,
   //     updatedBy: String
   // },
   // permissions: [{
   //     owner: [String],
   //     contributors: [String],
   //     viewer: [String]
   // }],
   // ganttChart: []

    projectName: String,
    projectGoal: {type: String, default: null},
    projectScope: {type: String, default: null},
    projectReasons: {type: String, default: null},
    projectBenefits: [],
    projectStartDate: Date,
    projectEndDate: Date,
    projectBudget: {
        value: {type: Number, default: null},
        currency: {type: String, default: null}
    },
    projectManager: {type: String, default: null},
    projectSteeringComitee: [],
    projectTeam: [],
    projectStages: [],
    projectKPI: [],
    projectRisk: [],
    projectOrganization: [],
    meta: {
        createdBy: String,
        createdAt: Date,
        updatedBy: String,
        updatedAt: Date
    },
    tags: {},
    ganttChart: []
});

module.exports = mongoose.model('Project', projectSchema);