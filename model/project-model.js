const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
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
        updatedAt: Date,
        status: {type: String, enum: ['Created', 'In Preparation', 'In Progress', 'Finished'], default: 'Created'}
    },
    tags: {},
    changeLog:[],
    ganttChart: []
});

module.exports = mongoose.model('Project', projectSchema);