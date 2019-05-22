const panelController = require('../controller/panel-controller');

module.exports = (app) => {

    app.post('/admin-panel/get-user', panelController.getUserById);
    app.get('/admin-panel/user-list', panelController.getAllUsers);
    app.post('/admin-panel/force-password-change', panelController.forceUserToChangePassword);
    app.post('/admin-panel/user-disable', panelController.disableUser);
    app.post('/admin-panel/user-enable', panelController.enableUser);
};