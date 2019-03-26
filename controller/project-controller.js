const Project = require('../model/project-model');

exports.index = (req, res) => {
     Project.find({}, (err, projectSelected) => {
        return res.json({projectSelected});
     })
};

exports.show = (req, res) => {
    Project.findById({_id: req.params.project_id}, (err, projectSelected) => {
       if(err) throw err;
       return res.json({projectSelected});
    });
};

exports.edit = (req, res) => {
    Project.findById({_id: req.params.project_id}, (err, projectSelected) => {
        if(err) throw err;
        return res.json({projectSelected});
    })
};

//TODO Add owner from passport
//TODO Add data to gantt chart
exports.create = (req, res) => {
     var project = new Project({
         name: req.body.name,
         description: req.body.description,
         owner: 'Łukasz Gronczakiewicz',
         tags: [req.body.tags],
         meta: {
             createdAt: Date.now(),
             updatedAt: Date.now(),
             createdBy: 'Łukasz Gronczakiewicz',
             updatedBy: 'Łukasz Gronczakiewicz'
         },
         ganttChart: {
             x: 22,
             y: 33
         }
     });

    project.save((err, projectDetails) => {
       if(err) throw err;
       res.send('Saved: ' + projectDetails);
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


