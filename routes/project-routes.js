const projectController = require('../controller/project-controller');

module.exports= (app) => {

     app.get('/projects', projectController.index);
     app.post('/project', projectController.create);
     app.post('/project/update', projectController.update);
     app.get('/project/delete/:project_id', projectController.delete);
};