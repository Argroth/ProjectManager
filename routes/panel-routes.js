const panelController = require('../controller/panel-controller');

module.exports = (app) => {

    app.get('/getallusers', panelController.getAllUsers);

};