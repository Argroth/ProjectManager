const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
//TODO Emailer change to new address
const User = require('../model/user-model');
require('../emailer/emailer-config');

//TODO Change secret to env variable
const secret = 'mysecreetsshhh';

const token = crypto.randomBytes(12).toString('hex');


exports.register = (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if(err){
            console.log(err);
        }else if(user){
            res.json('User with that email already exists');
        } else {
            const newUser = new User();
            newUser.email = req.body.email;
            newUser.password = crypto.randomBytes(20).toString('hex');
            newUser.meta.name = req.body.name;
            newUser.meta.department = req.body.department;
            newUser.meta.departmentRole = req.body.departmentRole;
            newUser.meta.company = req.body.company;
            newUser.meta.createdAt = Date.now();
            newUser.token.tokenID = token;
            newUser.token.expDate = Date.now()+86400000;


            const mailOptions = {
                from: 'dev@telemond-holding.com',
                to: req.body.email,
                subject: 'Utwórz hasło i aktywuj konto w TelemondApp!',
                text: 'Kliknij w link, aby utworzyć hasło i aktywować konto: http://localhost:3000/createpassword/' + token
            };

            transporter.sendMail(mailOptions, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Email sent');
                }
            });

            newUser.save((err) => {
                if (err)
                    throw err;
                return (newUser);
            });

            res.json('User created!');
        }
    });
};

exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email}, function(err, user) {
        if(!user){
            res.json('User not found');
        }
        else if(user) {
            bcrypt.compare(password, user.password, (err, passwordIsTheSame) => {
                console.log(passwordIsTheSame);
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

//Verifying user token sent by email upon registration
exports.verify = (req, res) => {
    User.findOne({"token.tokenID": req.params.token}, (err, userSelected) => {
        if(userSelected == null){
            res.json('Token is incorrect')
        }
        else if(userSelected.token.isVerified === false && userSelected.token.expDate > Date.now()){
            res.json('Token is correct')
        }
    });
};


//User creates password after token is verified
exports.createPassword = (req, res) => {
    User.findOne({"token.tokenID": req.body.token}, (err, user) => {
        user.token.tokenID = null;
        user.token.expDate = null;
        user.token.isVerified = true;
        user.password = bcrypt.hashSync(req.body.password, 10, null);
        user.save(err => {
            if(err) console.log(err);
        });
    });
    res.redirect('http://localhost:3000/login')
};

//Sends token to pass change on email
exports.sendEmailWithTokenToResetPassword = (req, res) => {
    const token = crypto.randomBytes(12).toString('hex');

    User.findOne({email: req.body.email}, (err, user) => {
        user.changePassword.tokenID = token;
        user.changePassword.expDate = Date.now()+86400000;


        user.save(err => {
            if(err) throw err;
        });

        const mailOptions = {
            from: 'dev@telemond-holding.com',
            to: user.email,
            subject: 'Reset hasła',
            text: 'Kliknij w link, aby zresetować hasło: http://localhost:3000/newpass/' + token
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log('Problem with sending')
            }
            else {
                console.log('Email sent');
            }
        });


    });
    res.json('Email with link sent');
};

exports.verifyChangePasswordToken = (req, res) => {
  User.findOne({"changePassword.tokenID": req.params.token}, (err, user) => {
      if(err) {
          console.log(err);
      }
      if(user && user.changePassword.expDate > Date.now()){
          res.json('Token correct');
      }
      else{
          res.json('Token incorrect');
      }
    });
};

//sends new pass to database
exports.newPassword = (req, res) => {
    User.findOne({"changePassword.tokenID": req.body.token}, (err, user) =>{
            user.changePassword.tokenID = null;
            user.changePassword.expDate = null;
            user.password = bcrypt.hashSync(req.body.password, 10, null);

            user.save(err => {
                if (err) throw err;
            });
    });
    res.json('Password changed. You can now log in with new password!');
};