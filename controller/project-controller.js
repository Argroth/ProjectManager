const Project = require('../model/project-model');
const Calendar = require('../model/calendar-model');
const Risk = require('../model/risk-model');
const moment = require('moment');

exports.index = (req, res) => {
     Project.find({}, (err, projectList) => {
         if(err){
             res.json('There was a problem fetching projects!');
         }else{
             let orderedProjectList = projectList.reverse();
             res.json({orderedProjectList});
         }
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
        projectCurrency,
        projectManager,
        projectSteeringComitee,
        projectTeam,
        projectStages,
        projectRisks,
        projectOrganization,
        projectMeetings,
        projectCommunication
    } = req.body.project;

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
         projectCurrency: projectCurrency,
         projectManager: projectManager.value,
         projectManagerObject: projectManager,
         projectSteeringComitee: projectSteeringComitee,
         projectTeam: projectTeam,
         projectStages: projectStages,
         projectRisks: projectRisks,
         projectOrganization: projectOrganization,
         projectMeetings: projectMeetings,
         projectCommunication: projectCommunication,
             meta: {
             createdAt: Date.now(),
             updatedAt: Date.now(),
             createdBy: req.userID,
             updatedBy: req.userID
             },
         ganttChart: []
     });

    project.save((err) => {
       if(err){
           res.json('Error creating project' +err)
       }else{
        res.json('Project created successfully!')
       }
    });
};



exports.createTask = (req, res) => {
    Project.findOne({_id: req.body.projectID}, (err, projectSelected) => {
        if(req.body.task.ignoreWeekends === true){
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

            console.log(x);
            projectSelected.ganttChart = [...projectSelected.ganttChart, x];
            projectSelected.save();
        }
        else if(req.body.task.ignoreWeekends === false){
            Calendar.find({offWork: true, day: {$gte: moment(req.body.task.startDate).format('YYYY-MM-DD'),
                                                $lte: moment(req.body.task.startDate).add(req.body.task.duration, 'days').format('YYYY-MM-DD')}}, (err, calendarSelected) => {
                let dateToAdd = Number(req.body.task.duration) + Number(calendarSelected.length);
                let endDate = moment(req.body.task.startDate).add(dateToAdd, 'days').format('YYYY-MM-DD');
                Calendar.findOne({day: endDate}, (err, dayFound) => {
                   if(dayFound.offWork === true){
                         Calendar.findOne({offWork: false, day: {$gt: moment(dayFound.day).format('YYYY-MM-DD')}}, (err, day) => {
                             //next Business Day
                             const startDate = (moment(req.body.task.startDate));
                             const y = (moment(day.day));
                             const difference = (y.diff(startDate, 'days'));
                             const finalDate = moment(req.body.task.startDate).add(difference, 'days').format('YYYY-MM-DD');

                             const newTask = {data: [
                                     [
                                         req.body.task.taskId,
                                         req.body.task.taskName,
                                         req.body.task.startDate,
                                         finalDate,
                                         req.body.task.duration,
                                         req.body.task.percentage,
                                         req.body.task.dependencies
                                     ]
                                 ]};


                             projectSelected.ganttChart = [...projectSelected.ganttChart, newTask];
                             projectSelected.save();
                         })
                    }else{
                       const newTask = {data: [
                               [
                                   req.body.task.taskId,
                                   req.body.task.taskName,
                                   req.body.task.startDate,
                                   endDate,
                                   req.body.task.duration,
                                   req.body.task.percentage,
                                   req.body.task.dependencies
                               ]
                           ]};


                       projectSelected.ganttChart = [...projectSelected.ganttChart, newTask];
                       projectSelected.save();
                   }
                });

            })
        }
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

exports.getRiskList = (req, res) => {
    Risk.find({projectID: req.body.projectID}, (err, list) => {
        res.json(list);
    })

};

exports.createRisk = (req, res) => {
    const risk = req.body.risk;

    //req.userID

    const newRisk = new  Risk({
        projectID: req.body.projectID,
        kind: risk.type,
        type: risk.type,
        probability: risk.probability,
        consequence: risk.consequence,
        description: risk.description,
        prevSupp: risk.prevSupp,
        corrective: risk.corrective
    });

    newRisk.save((err) => {
        if(err){
            res.json('Error creating risk' +err)
        }else{
            res.json('Risk created successfully!')
        }
    });
};


