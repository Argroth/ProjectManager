const bcrypt = require('bcrypt');
const crypto = require('crypto');

const User = require('../model/user-model');

require('../emailer/emailer-config');

const token = crypto.randomBytes(12).toString('hex');


exports.register = (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if(err){
            console.log(err);
        }else if(user){
            res.json('Użytkownik z takim e-mailem już istnieje');
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
                text: 'Kliknij w link, aby utworzyć hasło i aktywować konto: http://localhost:5000/verify/' + token
            };

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent' + info);
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

//TODO to cut controller list > create frontend get params, verify, and submit new password
exports.verify = (req, res) => {
    User.findOne({"token.tokenID": req.params.token}, (err, userSelected) => {
        if(userSelected.token.isVerified === false){
            User.findOne({email: userSelected.email}, (err, userVerifying) =>{
                const userVerified = userVerifying.toString();
                userSelected.token.tokenID === userVerifying.token.tokenID ?
                    res.redirect('http://localhost:3000/createpassword/'+req.params.token):
                    res.send('Błędny token');
            });
        }
    });
};

exports.verified = (req, res, userVerified) => {
    User.findOne({"token.tokenID": userVerified.token.tokenID}, (err, user) => {
        user.token.tokenID = null;
        user.token.isVerified = true;
        user.password = bcrypt.hashSync(req.body.password, 10, null);

        user.save(err => {
            if(err) throw err;
        });
    });
    res.send('verified and active')
};

//show "enter email" form
exports.changePass = (req, res) => {
    res.sendFile(path.join(__dirname + '/reset.html'));
};

//sends email with token
exports.resetPass = (req, res) => {
    const token = crypto.randomBytes(12).toString('hex');

    User.findOne({email: req.body.email}, (err, user) => {
        user.changePassword.tokenID = token;

        user.save(err => {
            if(err) throw err;
        });

        const mailOptions = {
            from: 'dev@telemond-holding.com',
            to: user.email,
            subject: 'Reset hasła',
            text: 'Kliknij w link, aby zresetować hasło: http://localhost:5000/newpass/' + token
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent');
            }
        });


    });
    res.send('email sent');
};

//shows 'enter new pass form'
exports.newPassForm = (req, res) => {
    User.findOne({"changePassword.tokenID": req.params.token}, (err, userSelected) => {
        User.findOne({email: userSelected.email}, (err, userVerifying) =>{
            const userVerified = userVerifying.toString();
            userSelected.changePassword.tokenID === userVerifying.changePassword.tokenID ?
                res.sendFile(path.join(__dirname + '/test.html'), userVerified):
                res.send('Błędny token');
        });
    });
};

//sends new pass to database
exports.newPass = (req, res, userVerified) => {
    User.findOne({"changePassword.tokenID": req.body.token}, (err, user) =>{
        user.token.tokenID = null;
        user.password = bcrypt.hashSync(req.body.password, 10, null);

        user.save(err => {
            if(err) throw err;
        });
    });
};