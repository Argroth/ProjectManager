const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/user-model');


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
            usernameField : 'email',
            passwordField : 'password',
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

                        var newUser            = new User();
                        newUser.email    = email;
                        newUser.password = newUser.generateHash(password);
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