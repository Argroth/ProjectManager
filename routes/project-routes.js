const projectController = require('../controller/project-controller');

module.exports= (app) => {

     app.get('/project-manager/list-projects', projectController.index);
     app.post('/project-manager/create-project', projectController.create);
     app.post('/project-manager/project-data', projectController.getProjectData);

     app.post('/project/add-task', projectController.createTask);


     app.post('/project/update', projectController.update);
     app.get('/project/delete/:project_id', projectController.delete);
     //app.get('/project/add-task', projectController.createTask);
};