const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    projectName: String,
    projectGoal: {type: String, default: null},
    projectScope: {type: String, default: null},
    projectReasons: {type: String, default: null},
    projectBenefits: [],
    projectStartDate: {type: Date, default: null},
    projectEndDate: {type: Date, default: null},
    projectBudget: {
        value: {type: Number, default: null},
        currency: {type: String, default: null}
    },
    projectCurrency: [],
    projectManager: {type: String, default: null},
    projectManagerObject: [],
    projectSteeringComitee: [],
    projectTeam: [],
    projectStages: [],
    projectRisks: [],
    projectOrganization: [],
    projectMeetings: [],
    projectCommunication: [],
    meta: {
        createdBy: String,
        createdAt: Date,
        updatedBy: String,
        updatedAt: Date,
        status: {type: String, enum: ['InPreparation', 'InImplementation', 'Finished'], default: 'InPreparation'}
    },
    tags: {},
    changeLog:[],
    ganttChart: []
});

module.exports = mongoose.model('Project', projectSchema);