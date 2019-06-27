const secret = 'mysecreetsshhh';
const jwt = require('jsonwebtoken');

const User = require('../model/user-model');

exports.getUserDetails = (req, res, next) => {
    const token =
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;

        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.status(401).send('Unauthorized: Invalid token');
            } else {
                User.findOne({email: decoded.email}, (err, userData) =>{
                    req.userID = userData._id;
                    next();
                });

            }
        });
};