const Project = require('../model/project-model');
const Calendar = require('../model/calendar-model');
const Risk = require('../model/risk-model');
const User = require('../model/user-model');
const Task = require('../model/task-model');

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
        User.find({}, (err, users) => {
           list.forEach(item => {
                users.find(x => {
                    if(item.createdBy.toString() === x._id.toString()){
                        return item.createdBy = x.meta.name;
                    }
                })
           });
            res.json(list);
        });
    })
};

exports.createRisk = (req, res) => {
    const risk = req.body.risk;

    const significanceValue = [
        {value: 0, label: "", color:""},
        {value: 1, label: "Mała", color:"primary"},
        {value: 2, label: "Mała", color:"primary"},
        {value: 3, label: "Średnia", color:"warning"},
        {value: 4, label: "Średnia", color:"warning"},
        {value: 6, label: "Duża", color:"danger"},
        {value: 9, label: "Duża", color:"danger"}
    ];

    const typeOfRisk = [
        {value: "Pozytywne", label: "Pozytywne", color:"success"},
        {value: "Negatywne", label: "Negatywne", color:"danger"}
    ];

    let significance = risk.probability * risk.consequence;
    let significanceData = null;
    let typeData = null;

    typeOfRisk.filter(item => {if(risk.type === item.value){return typeData = item}});
    significanceValue.filter(item => {if(significance === item.value){return significanceData = item}});

    const newRisk = new  Risk({
        projectID: req.body.projectID,
        kind: risk.kind,
        type: risk.type,
        typeColor: typeData.color,
        typeLabel: typeData.label,
        probability: risk.probability,
        consequence: risk.consequence,
        description: risk.description,
        prevSupp: risk.prevSupp,
        corrective: risk.corrective,
        significance: significance,
        significanceColor: significanceData.color,
        significanceLabel: significanceData.label,
        createdBy: req.userID
    });

    newRisk.save((err) => {
        if(err){
            res.json('Error creating risk' +err)
        }else{
            res.json('Risk created successfully!')
        }
    });
};

exports.markRiskAsOccurred = (req, res) => {
    const errors = [];
     req.body.risks.map(async risk => {
         await Risk.findOneAndUpdate({_id: risk}, {$set:{occurred: true}}, (err) => {
             if(err){
                 errors.push('Error saving risk: ' + risk);
             }
        });
    });
     if(errors.length > 0){
         res.json('There was a problem with marking risk');
     }else{
         res.json('Risks marked as occurred');
     }
};

exports.getRiskData = (req, res) => {
    Risk.findOne({_id: req.body.risk}, (err, riskFound) => {
        if(err){
            res.json('There was a problem with fetching risk');
        }else{
            res.json(riskFound);
        }
    })
};

exports.editRisk = (req, res) => {
    const risk = req.body.risk;

    const significanceValue = [
        {value: 0, label: "", color:""},
        {value: 1, label: "Mała", color:"primary"},
        {value: 2, label: "Mała", color:"primary"},
        {value: 3, label: "Średnia", color:"warning"},
        {value: 4, label: "Średnia", color:"warning"},
        {value: 6, label: "Duża", color:"danger"},
        {value: 9, label: "Duża", color:"danger"}
    ];

    const typeOfRisk = [
        {value: "Pozytywne", label: "Pozytywne", color:"success"},
        {value: "Negatywne", label: "Negatywne", color:"danger"}
    ];

    let significance = risk.probability * risk.consequence;
    let significanceData = null;
    let typeData = null;

    typeOfRisk.filter(item => {if(risk.type === item.value){return typeData = item}});
    significanceValue.filter(item => {if(significance === item.value){return significanceData = item}});


    Risk.findOne({_id: req.body.risk._id}, (err, selectedRisk) => {
       if(err){
           res.json('There was a problem with fetching risk data');
       } else {
               selectedRisk.kind = risk.kind;
               selectedRisk.type = risk.type;
               selectedRisk.typeColor = typeData.color;
               selectedRisk.typeLabel = typeData.label;
               selectedRisk.probability = risk.probability;
               selectedRisk.consequence = risk.consequence;
               selectedRisk.description = risk.description;
               selectedRisk.prevSupp = risk.prevSupp;
               selectedRisk.corrective = risk.corrective;
               selectedRisk.significance = significance;
               selectedRisk.significanceColor = significanceData.color;
               selectedRisk.significanceLabel = significanceData.label;


           selectedRisk.save();
           res.json(selectedRisk).status(200);
       }
    });
};

exports.riskDecision = (req, res) => {
    console.log(req.body);
    const errors = [];

    req.body.risks.map(async risk => {
        await Risk.findOne({_id: risk}, (err, riskFound) => {

            if(riskFound.occurred === true){
                riskFound.decision = 'Brak działań';
            }
            riskFound.save();

            if(err){
                errors.push('Error saving risk: ' + risk);
            }
        });
    });
    if(errors.length > 0){
        res.json('There was a problem with setting risk as "do nothing"');
    }else{
        res.json('Risks set to "do nothing"');
    }
};

exports.createTask = (req, res) => {
    console.log(req.body);
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

                    const newTask = new  Task({
                        taskID: req.body.task.taskId,
                        taskName: req.body.task.taskName,
                        resource: req.body.task.resource,
                        startDate: req.body.task.startDate,
                        endDate: req.body.task.endDate,
                        duration: duration.length + 1,
                        percentComplete: req.body.task.percentage,
                        dependencies: req.body.task.dependencies,
                        projectID: req.body.projectID,
                        ignoreWeekends: req.body.task.ignoreWeekends,
                    });

                    newTask.save((err) => {
                        if(err){
                            res.json('Error creating risk' +err)
                        }else{
                            res.json('Risk created successfully!')
                        }
                    });
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

                    const newTask = new  Task({
                        taskID: req.body.task.taskId,
                        taskName: req.body.task.taskName,
                        resource: req.body.task.resource,
                        startDate: req.body.task.startDate,
                        endDate: period[duration -1].day,
                        duration: req.body.task.duration,
                        percentComplete: req.body.task.percentage,
                        dependencies: req.body.task.dependencies,
                        projectID: req.body.projectID,
                        ignoreWeekends: req.body.task.ignoreWeekends,
                    });

                    newTask.save((err) => {
                        if(err){
                            res.json('Error creating risk' +err)
                        }else{
                            res.json('Risk created successfully!')
                        }
                    });
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


                    const newTask = new  Task({
                        taskID: req.body.task.taskId,
                        taskName: req.body.task.taskName,
                        resource: req.body.task.resource,
                        startDate: req.body.task.startDate,
                        endDate: req.body.task.endDate,
                        duration: duration.length +1,
                        percentComplete: req.body.task.percentage,
                        dependencies: req.body.task.dependencies,
                        projectID: req.body.projectID,
                        ignoreWeekends: req.body.task.ignoreWeekends,
                    });

                    newTask.save((err) => {
                        if(err){
                            res.json('Error creating risk' +err)
                        }else{
                            res.json('Risk created successfully!')
                        }
                    });
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
                    const newTask = new  Task({
                        taskID: req.body.task.taskId,
                        taskName: req.body.task.taskName,
                        resource: req.body.task.resource,
                        startDate: req.body.task.startDate,
                        endDate: period[duration].day,
                        duration: req.body.task.duration,
                        percentComplete: req.body.task.percentage,
                        dependencies: req.body.task.dependencies,
                        projectID: req.body.projectID,
                        ignoreWeekends: req.body.task.ignoreWeekends,
                    });

                    newTask.save((err) => {
                        if(err){
                            res.json('Error creating risk' +err)
                        }else{
                            res.json('Risk created successfully!')
                        }
                    });
                }
            }
        });
};

exports.getTaskList = (req, res) => {
    Task.find({projectID: req.body.projectID}, (err, tasksList) => {
        if(err){
            res.status('492').json('There was a problem with fetching task-list');
        }else{
            res.status('292').json(tasksList);
        }
    })
};

exports.updateTask = (req, res) => {
    const updateID = ['TaskID3'];


    Task.find({projectID: '5d9b260fcfefce47b8a66d19'}, (err, tasks) => {
        let numberOfChecks = tasks.length;

        for(let i = numberOfChecks; i > 0; i--){
            tasks.map(task => {
                updateID.map(id => {
                    if(task.dependencies === id){
                        updateID.push(task.taskID);
                    }
                });
            })
        }

        let unifiedArray = _.uniq(updateID);
        tasks.map(task => {
            unifiedArray.map(id => {
                if(id === task.taskID){
                    updateDate(task, 7);
                }
            })
        });
    });

    const updateDate = (task, daysToAdd) => {
        //checks if task has ignoreWeekends set to true or false depending on the bool function returns new date calculated with or without weekends

        Calendar.find({}, (err, calendar) => {
            //all days
            if(task.ignoreWeekends === true){

            } else if (task.ignoreWeekends === false){ //business days

            }
        })
    };
res.json('123');
};
