const User = require('../model/user-model');


exports.getAllUsers = (req, res) => {
  User.find({}, (err, users) => {
    res.json(users);
  });
};