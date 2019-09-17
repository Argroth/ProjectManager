const projectController = require('../controller/project-controller');
const userDetailsMiddleware = require('../middlewares/user-details-middleware');

module.exports= (app) => {

     app.get('/project-manager/list-projects', projectController.index);
     app.post('/project-manager/create-project',userDetailsMiddleware.getUserDetails, projectController.create);
     app.post('/project-manager/project-data', projectController.getProjectData);
     app.post('/project-manager/project-data/risk-list', projectController.getRiskList);
     app.post('/project-manager/project-data/risk-create',userDetailsMiddleware.getUserDetails, projectController.createRisk);
     app.post('/project/add-task', projectController.createTask);
     //app.get('/project/add-task', projectController.createTask);
};