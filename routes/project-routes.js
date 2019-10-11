const projectController = require('../controller/project-controller');
const userDetailsMiddleware = require('../middlewares/user-details-middleware');

module.exports= (app) => {

     app.get('/project-manager/list-projects', projectController.index);
     app.post('/project-manager/create-project',userDetailsMiddleware.getUserDetails, projectController.createProject);
     app.post('/project-manager/project-data', projectController.getProjectData);
     app.post('/project-manager/project-data/risk', projectController.getRiskData);
     app.post('/project-manager/project-data/risk-list', projectController.getRiskList);
     app.post('/project-manager/project-data/risk-create', userDetailsMiddleware.getUserDetails, projectController.createRisk);
     app.post('/project-manager/project-data/risk-occurred', projectController.markRiskAsOccurred);
     app.post('/project-manager/project-data/risk-edit', projectController.editRisk);
     app.post('/project-manager/project-data/risk-decision', projectController.riskDecision);
     app.post('/project-manager/project-data/task-list', projectController.getTaskList);
     app.post('/project-manager/project-data/edit-task', projectController.updateTask);
     app.get('/task', projectController.updateTask);
     app.post('/project/add-task', projectController.createTask);
};