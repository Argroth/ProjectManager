const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../model/user-model');
require('../emailer/emailer-config');
//TODO Change secret to env variable
const secret = 'mysecreetsshhh';

const token = crypto.randomBytes(12).toString('hex');


exports.register = (req, res) => {
    User.findOne({email: req.body.user.email}, (err, user) => {
        if(err){
            res.json('There was an error while creating new user');
        }else if(user){
            res.json('User with that email already exists');
        } else {
            const newUser = new User();
            newUser.email = req.body.user.email;
            newUser.password = crypto.randomBytes(20).toString('hex');
            newUser.meta.name = req.body.user.name;
            newUser.meta.department = req.body.user.department;
            newUser.meta.departmentRole = req.body.user.departmentRole;
            newUser.meta.company = req.body.user.company;
            newUser.meta.createdAt = Date.now();
            newUser.authToken.tokenID = token;
            newUser.authToken.expDate = Date.now()+86400000;


            const mailOptions = {
                from: 'development@telemond-holding.com',
                to: req.body.user.email,
                subject: 'Utwórz hasło i aktywuj konto w TelemondApp!',
                text: 'Kliknij w link, aby utworzyć hasło i aktywować konto: http://localhost:3000/auth/create-password/' + token
            };

            transporter.sendMail(mailOptions, (err) => {
                if (err) {
                    res.json('Problem with e-mail sending');
                } else {
                    console.log('Email sent');
                }
            });

            newUser.save((err) => {
                if (err)
                    throw err;
                return (newUser);
            });

            res.json('User created!');        }
    });
};

exports.login = (req, res) => {
    const email = req.body.user.email;
    const password = req.body.user.password;
    User.findOne({email: email},(err, user) => {
        if(!user){
            res.json('User not found');
        }
        else if(user) {
            bcrypt.compare(password, user.password, (err, passwordIsTheSame) => {
                if (passwordIsTheSame === false) {
                    res.json('Password is not correct');
                } else if (passwordIsTheSame === true) {
                    const payload = { email };
                    const token = jwt.sign(payload, secret, {
                        expiresIn: '24h'
                            });
                    res.cookie('token', token, { httpOnly: true }).sendStatus(200);
                }
            });
        }
    });
};



//User creates password after token is verified
exports.createPassword = (req, res) => {
    User.findOne({$or:[{"authToken.tokenID": req.body.token}, {"changePasswordToken.tokenID": req.body.token}]}, (err, userSelected) => {
        if(err){
            res.json('Token is incorrect');
        }
        else if(userSelected){
            userSelected.authToken.tokenID = null;
            userSelected.authToken.expDate = null;
            userSelected.authToken.isVerified = true;

            userSelected.changePasswordToken.tokenID = null;
            userSelected.changePasswordToken.expDate = null;

            userSelected.password = bcrypt.hashSync(req.body.values.password, 10, null);

            userSelected.save(err => {
                if(err){
                    res.json('There was a problem with creating a password');
                }
             res.json('Password created successfully');
            });
        }
    });
};


//TODO GET THIS OUT OF THIS SHIT
const Calendar = require('../model/calendar-model');
exports.test = (req, res) => {

    const newDay = new Calendar();
    newDay.day = Date.now()+86400000;

    newDay.save(err=> {
    });


    Calendar.find({}, (err, list) => {
        res.json(list);
    });

};

//Sends token to pass change on email
exports.sendEmailWithTokenToResetPassword = (req, res) => {
   const token = crypto.randomBytes(12).toString('hex');
    User.findOne({email: req.body.values.email}, (err, user) => {
        if(err){
            res.json('User with that e-mail is not existing');
        } else if(!user){
            res.json('User does not exist');
        }
        else{
            user.changePasswordToken.tokenID = token;
            user.changePasswordToken.expDate = Date.now() + 86400000;


            user.save(err => {
                if(err) {
                    res.json('Error');
                }
            });

            const mailOptions = {
                from: 'development@telemond-holding.com',
                to: user.email,
                subject: 'Reset hasła',
                text: 'Kliknij w link, aby zresetować hasło: http://localhost:3000/auth/create-password/' + token
            };

            transporter.sendMail(mailOptions, (err) => {
                if (err) {
                    res.json('There was a problem with sending e-mail, try one more time');
                } else {
                    res.json('Email with link to reset password sent');
                }
            });

        }
    });
};