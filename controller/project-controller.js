const Project = require('../model/project-model');
const Calendar = require('../model/calendar-model');
const Risk = require('../model/risk-model');
const moment = require('moment');
const _ = require('lodash');

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
        Calendar.find({}, (err, calendar) => {
            let calendarArray = [];

            for(let i=0; i<calendar.length; i++){
                calendarArray.push({_id: calendar[i]._id, day: moment(calendar[i].day).format('YYYY-MM-DD'), offWork: calendar[i].offWork, description: calendar[i].description, name: calendar[i].name});
            }

            const ignoreWeekends = req.body.task.ignoreWeekends;

            if(ignoreWeekends === true /*all*/) {
                if(req.body.task.endDate){
                    const duration = [];

                    calendarArray.map(x => {
                        if(x.day > req.body.task.startDate && x.day < req.body.task.endDate){
                            duration.push(x)
                        }
                    });

                    const x = {
                        data: [
                            [
                                req.body.task.taskId,
                                req.body.task.taskName,
                                req.body.task.resource,
                                req.body.task.startDate,
                                req.body.task.endDate,
                                duration.length +1,
                                req.body.task.percentage,
                                req.body.task.dependencies,
                                req.body.task.ignoreWeekends
                            ]
                        ]
                    };


                    console.log(x);
                    projectSelected.ganttChart = [...projectSelected.ganttChart, x];
                    projectSelected.save();
                } else /* if duration*/ {
                    const startDate = _.find(calendarArray, {day: req.body.task.startDate}).day;
                    let period = [];
                    const duration = req.body.task.duration;

                    if(startDate){
                        calendarArray.map(x => {
                            if(x.day > startDate && x.day < calendarArray[calendarArray.length-1].day){
                                period.push(x)
                            }
                        })
                    }
                    const x = {
                        data: [
                            [
                                req.body.task.taskId,
                                req.body.task.taskName,
                                req.body.task.resource,
                                req.body.task.startDate,
                                period[duration -1].day,
                                req.body.task.duration,
                                req.body.task.percentage,
                                req.body.task.dependencies,
                                req.body.task.ignoreWeekends
                            ]
                        ]
                    };

                    console.log(x);
                    projectSelected.ganttChart = [...projectSelected.ganttChart, x];
                    projectSelected.save();
                }
            }

            if(ignoreWeekends === false /*business*/) {
                if(req.body.task.endDate){
                    const duration = [];

                    calendarArray.map(x => {
                        if(x.day > req.body.task.startDate && x.day < req.body.task.endDate){
                            if(x.offWork === false){duration.push(x)}
                        }
                    });

                    const x = {
                        data: [
                            [
                                req.body.task.taskId,
                                req.body.task.taskName,
                                req.body.task.resource,
                                req.body.task.startDate,
                                req.body.task.endDate,
                                duration.length +1,
                                req.body.task.percentage,
                                req.body.task.dependencies,
                                req.body.task.ignoreWeekends
                            ]
                        ]
                    };

                    console.log('1');
                    console.log(x);
                    projectSelected.ganttChart = [...projectSelected.ganttChart, x];
                    projectSelected.save();
                } else /* if duration*/ {
                const startDate = _.find(calendarArray, {day: req.body.task.startDate}).day;
                let period = [];
                const duration = req.body.task.duration;

                if(startDate){
                    calendarArray.map(x => {
                        if(x.day > startDate && x.day < calendarArray[calendarArray.length-1].day){
                            if(x.offWork === false){period.push(x)}
                        }
                    });
                }
                const x = {
                    data: [
                        [
                            req.body.task.taskId,
                            req.body.task.taskName,
                            req.body.task.resource,
                            req.body.task.startDate,
                            period[duration].day,
                            req.body.task.duration,
                            req.body.task.percentage,
                            req.body.task.dependencies,
                            req.body.task.ignoreWeekends
                        ]
                    ]
                };

                console.log('2');
                console.log(x);
                projectSelected.ganttChart = [...projectSelected.ganttChart, x];
                projectSelected.save();
                }
            }

            res.json(projectSelected);
        });
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


