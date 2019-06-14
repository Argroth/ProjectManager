const Project = require('../model/project-model');
const moment = require('moment');

exports.index = (req, res) => {
     Project.find({}, (err, projectList) => {
         //TODO Add err handling
        return res.json({projectList});
     })
};



exports.create = (req, res) => {
    const {
        projectName,
        projectGoal,
        projectScope,
        projectReasons,
        projectBenefits,
        projectStartDate,
        projectEndDate,
        projectBudget,
        currency,
        projectManager,
        projectSteeringComitee,
        projectTeam,
        projectStage,
        projectKPI,
        projectRisk,
        projectOrganization
    } = req.body.project;

    console.log(req.body.project);
     const project = new Project({
         projectName: projectName,
         projectGoal: projectGoal,
         projectScope: projectScope,
         projectReasons: projectReasons,
         projectBenefits: projectBenefits,
         projectStartDate: projectStartDate,
         projectEndDate: projectEndDate,
         projectBudget:{
             value: projectBudget,
             currency: currency
         },
         projectManager: projectManager,
         projectSteeringComitee: projectSteeringComitee,
         projectTeam: projectTeam,
         projectStages: projectStage,
         projectKPI: projectKPI,
         projectRisk: projectRisk,
         projectOrganization: projectOrganization,
             meta: {
             createdAt: Date.now(),
             updatedAt: Date.now(),
             createdBy: 'Łukasz Gronczakiewicz',
             updatedBy: 'Łukasz Gronczakiewicz'
         },
         ganttChart: []
     });

    project.save((err) => {
       if(err){
           res.json('Error creating project' +err)
       }else{
        res.json('Project created successfully')
       }
    });
};

//TODO updatedBy fetch from passport user
exports.update = (req, res) => {
    Project.findByIdAndUpdate({_id: req.params.project_id}, (err, projectSelected) => {
        if(err) throw err;

        projectSelected.name = req.body.name;
        projectSelected.description = req.body.description;
        projectSelected.tags = req.body.tags;
        projectSelected.meta.updatedAt = Date.now();
        projectSelected.meta.updatedBy = "Łukasz Gronczakiewicz";

        projectSelected.save((err, projectDetails) => {
           if(err) throw err;
           res.send('Updated: ' + projectDetails);
        });

    });
};


//TODO instead of removing, change database to archive
//TODO get id from react frontend
//TODO Protection!
exports.delete = (req, res) => {
    Project.findByIdAndRemove({_id: req.params.project_id}, (err, projectSelected) => {
    const log = {
        message: 'Project deleted: ',
        project_id: projectSelected._id
        };

    console.log(log);
    res.redirect('/projects')
    });
};

exports.createTask = (req, res) => {
    console.log(req.body);
    Project.findOne({_id: req.body.projectID}, (err, projectSelected) => {


        if(req.body.ignoreWeekends === true){

        }


        const x = {data: [
            [
            req.body.task.taskId,
            req.body.task.taskName,
            req.body.task.startDate,
            moment(req.body.task.startDate).add(req.body.task.duration, 'days').format('YYYY-MM-DD'),
            req.body.task.duration,
            req.body.task.percentage,
            req.body.task.dependencies
            ]
        ]};
        projectSelected.ganttChart = [...projectSelected.ganttChart, x];
        projectSelected.save();
        res.json(projectSelected);
    });
};

exports.getProjectData = (req, res) => {
    Project.findOne({_id: req.body.projectID}, (err, projectSelected) => {
        if(err){
            res.json('Invalid project ID');
        }else{
           res.json(projectSelected);
        }
    });
};


