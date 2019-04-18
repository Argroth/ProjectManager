const User = require('../model/user-model');


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