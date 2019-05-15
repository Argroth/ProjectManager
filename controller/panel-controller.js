const User = require('../model/user-model');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
require('../emailer/emailer-config');

exports.getAllUsers = (req, res) => {
  User.find({}, (err, users) => {
    if(err){
      res.json('Error finding users');
    }
    res.json(users);
  });
};

exports.getAllInactiveUsers = (req, res) => {
  User.find({isActive: 'false'}, (err, users) => {
    if(err){
      res.json('No users found');
    }
    res.json(users);
  })
};

exports.forceUserToChangePassword = (req, res) => {
  const token = crypto.randomBytes(20).toString('hex');
    User.findOne({_id: req.body.user._id}, (err, user) => {
      if(err){
        res.json('There was an error finding user');
      }
        user.password = bcrypt.hashSync(crypto.randomBytes(20).toString('hex'), 10, null);
        user.changePasswordToken.tokenID = token;
        user.changePasswordToken.expDate = Date.now()+86400000;

        user.save((err) => {
          if (err) throw err;
          return user;
        });

      const mailOptions = {
        from: 'dev@telemond-holding.com',
        to: req.body.user.email,
        subject: 'Administrator wymusił zmianę hasła do twojego konta!',
        text: 'Kliknij w link, aby utworzyć nowe hasło: http://localhost:3000/auth/create-password/' + token
      };

      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Force password change: Email sent');
        }
      });
    });

  res.json('Email with reset link sent');
};

exports.disableUser = (req, res) => {
  User.findOne({_id: req.body.user._id}, (err, user) => {

        user.password = bcrypt.hashSync(crypto.randomBytes(20).toString('hex'), 10, null);
        user.isActive = false;

        user.save((err) => {
          if (err) throw err;
          return user;
        });

  });
  res.json('User can no longer login and its password has been changed');
};

exports.enableUser = (req, res) => {
  const token = crypto.randomBytes(20).toString('hex');

  User.findOne({_id: req.body.user._id}, (err, user) => {
    if(err){
      res.json('There was an error finding user');
    }
    user.isActive = true;
    user.changePasswordToken.tokenID = token;
    user.changePasswordToken.expDate = Date.now()+86400000;

    user.save((err) => {
      if (err) throw err;
      return user;
    });

    const mailOptions = {
      from: 'dev@telemond-holding.com',
      to: req.body.user.email,
      subject: 'Utwórz nowe hasło Telemond APP',
      text: 'Kliknij w link, aby utworzyć nowe hasło: http://localhost:3000/auth/create-password/' + token
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Account enable: Email sent');
      }
    });
  });

  res.json('Email with reset link sent');
};