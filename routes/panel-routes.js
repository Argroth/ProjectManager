const panelController = require('../controller/panel-controller');

module.exports = (app) => {

    app.get('/getallusers', panelController.getAllUsers);
    app.post('/forcepasswordchange', panelController.forceUserToChangePassword);
    app.post('/disableuser', panelController.disableUser);
    app.post('/enableuser', panelController.enableUser);
};