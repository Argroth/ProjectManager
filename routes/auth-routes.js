const authController = require('../controller/auth-controller');
const authMiddleware = require('../middlewares/auth-middleware');

module.exports = (app) => {
        app.post('/auth/login', authController.login);
        app.post('/auth/register', authController.register);
        app.post('/auth/verify', authMiddleware.verifyToken);
        app.post('/auth/create-password', authMiddleware.verifyToken, authController.createPassword);
        app.post('/auth/reset-password', authController.sendEmailWithTokenToResetPassword);
        app.post('/auth/check-user-token', authMiddleware.withAuth, authController.authMiddlewareResponse);
};