const User = require('../model/user-model');

exports.verify = (req, res) => {
    console.log(req.params.token);
    User.find({"token.tokenID": req.params.token}, (err, userSelected) => {
       //if(userSelected[0].token.isVerified === false){

        //} else
        console.log(userSelected[0].email);
       //return res.json(userSelected[0].token.tokenID);
    });
};