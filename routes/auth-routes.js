const authController = require('../controller/auth-controller');

module.exports = (app) => {

    app.post('/register', authController.register);
    app.get('/verify/:token', authController.verify);
    app.post('/verified/:token', authController.verified);
    app.get('/changepassword', authController.changePass);
    app.post('/resetpass', authController.resetPass);
    app.get('/newpass/:token', authController.newPassForm);
    //   app.post('/newpass', authController.newPass);
};