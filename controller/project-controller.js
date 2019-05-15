const Project = require('../model/project-model');

exports.index = (req, res) => {
     Project.find({}, (err, projectList) => {
         //TODO Add err handling
        return res.json({projectList});
     })
};

//TODO Add data to gantt chart
exports.create = (req, res) => {
    console.log(req.body.project.name);
     const project = new Project({
         name: req.body.project.name,
         description: req.body.project.description,
         owner: 'Łukasz Gronczakiewicz',
         tags: [req.body.project.tags],
         meta: {
             createdAt: Date.now(),
             updatedAt: Date.now(),
             createdBy: 'Łukasz Gronczakiewicz',
             updatedBy: 'Łukasz Gronczakiewicz'
         },
         ganttChart: [
             "[{ type: 'string', label: 'Task ID' },{ type: 'string', label: 'Task Name' },{ type: 'date', label: 'Start Date' }" +
             ",{ type: 'date', label: 'End Date' },{ type: 'number', label: 'Duration' },{ type: 'number', label: 'Percent Complete' }" +
             ",{ type: 'string', label: 'Dependencies' },]"
         ]
     });

    project.save((err) => {
       if(err){
           res.json('Error creating project')
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
    Project.findOne({_id: '5cd3f8c95bf55625ac97ea7d'}, (err, projectSelected) => {
        console.log(projectSelected);

        projectSelected.ganttChart = [...projectSelected.ganttChart, 123];

        projectSelected.save();

        res.json('123');

    });
    res.json('123');
};


