const Project = require('../model/project-model');

let d = new Date();

exports.index = (req, res) => {
     Project.find({}, (err, projectsSelected) => {
        return res.json({projectsSelected});
     })
};

exports.show = (req, res) => {
     return res.json({id: req.params.project_id});
};

exports.create = (req, res) => {
     var project = new Project({
         name: '123',
         description: '12333',
         meta: {
             createdAt: d.getDate(),
             updatedAt: d.getDate(),
             createdBy: 'lukasz@wp.pl',
             updatedBy: 'lukasz@wp.pl'
         },
         ganttChart: {
             x: 22,
             y: 33
         }
     })

    project.save((err, projects) => {
       if(err) throw err;
       res.send('zapisano!' + projects);
    });
};

exports.update = (req, res) => {
    res.send('project update');
};


//TODO instead of removing, change database to archive
//TODO get id from react frontend
//TODO Protection!
exports.delete = (req, res) => {
    Project.findByIdAndRemove({_id: req.params.project_id}, (err, projectSelected => {

    const log = {
        message: 'Project deleted: ',
        project_id: projectSelected._id
        };

    console.log(log);
    res.redirect('/projects')

    }));
};


