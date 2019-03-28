const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');

const User = require('../model/user-model');

require('../emailer/emailer-config');


module.exports = passport => {
    passport.serializeUser((user, done)=> {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id,(err, user) => {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback : true
        },
        (req, email, password, done) => {
            process.nextTick(() =>  {

                User.findOne({ 'email' :  email }, (err, user) => {
                    if (err)
                        return done(err);
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'Adres e-mail jest już zajęty.'));
                    } else {
//TODO Add user details to login form
                        const token = crypto.randomBytes(12).toString('hex');
                        const newUser = new User();
                        newUser.email = email;
                        newUser.password = newUser.generateHash(password);
                        newUser.role = req.body.role;
                        newUser.meta.name = req.body.name;
                        newUser.meta.department = req.body.department;
                        newUser.meta.departmentRole = req.body.departmentRole;
                        newUser.meta.company = req.body.company;
                        newUser.meta.createdAt = Date.now();
                        newUser.token.tokenID = token;
                        newUser.changePassword.tokenID = '';
                        newUser.changePassword.expDate = Date.now();

                        const mailOptions = {
                            from: 'dev@telemond-holding.com',
                            to: email,
                            subject: 'Utwórz hasło i aktywuj konto w TelemondApp!',
                            text: 'Kliknij w link, aby utworzyć hasło i aktywować konto: http://localhost:5000/verify/' + token
                        };

//TODO unlock emails

                        transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('Email sent');
                            }
                        });

                        newUser.save((err) => {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }

                });

            });

        }));

    passport.use('local-login', new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
        },
        (req, email, password, done) => {
            User.findOne({ 'email' :  email },(err, user) => {
                if (err)
                    return done(err);
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'Brak użytkownika w bazie danych.'));
                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Błędne hasło.'));
                return done(null, user);
            });

        }));

};