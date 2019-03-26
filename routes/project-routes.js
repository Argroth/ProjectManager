const projectController = require('../controller/project-controller');

module.exports= (app) => {

     app.get('/projects', projectController.index);
     app.get('/project/:project_id', projectController.show);
     app.get('/project', projectController.create);
     app.get('/project/edit/:project_id', projectController.edit);
     app.post('/project/update', projectController.update);
     app.get('/project/delete/:project_id', projectController.delete);

};