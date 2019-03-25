const passport = require('passport');
const path = require('path');
require('../passport/passport-config')(passport);

module.exports = (app) => {

    app.get('/login',(req, res) => {
        //res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/',
        failureFlash: true
    }));

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/',
        failureFlash: true
    }));

    app.get('/signup', (req, res) => {
        res.sendFile(path.join(__dirname + '/test.html'));
    });

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

}