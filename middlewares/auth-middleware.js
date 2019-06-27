const jwt = require('jsonwebtoken');
//TODO make secret env variable
const secret = 'mysecreetsshhh';

const User = require('../model/user-model');


exports.withAuth = (req, res, next) => {
    const token =
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;

    if (!token) {
        req.error = 401;
        req.errorMessage = 'Unauthorized: No token provided';
        next();
    } else {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                req.error = 404;
                req.errorMessage = 'Token not decoded';
                next();
            } else {
                req.email = decoded.email;
                next();
            }
        });
    }
};


exports.verifyToken = (req, res, next) => {
    //just verify token
    if(req.body.action === 'verify'){
        User.findOne({
                $or: [
                    {'authToken.tokenID': req.body.token},
                    {'changePasswordToken.tokenID': req.body.token}]
            },
            (err, userSelected) => {

            if(userSelected){
                res.json('Token is correct');
            }else{
                res.json('Token is incorrect');
            }

            });
    }
    else{
        //verify token and pass token to controller
        User.findOne({
                $or: [
                    {'authToken.tokenID': req.body.token},
                    {'changePasswordToken.tokenID': req.body.token}]
            }, () => {
            next();
        });
    }
};
