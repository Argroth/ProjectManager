const authController = require('../controller/auth-controller');

module.exports = (app) => {

    app.post('/login', authController.login);
    app.post('/register', authController.register);
    app.get('/verify/:token', authController.verify);
    app.post('/createpassword', authController.createPassword);
    app.post('/resetpassword', authController.sendEmailWithTokenToResetPassword);
    app.post('/newpassword', authController.newPassword);
    app.get('/verifytoken/:token', authController.verifyChangePasswordToken)
};