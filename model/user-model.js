const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserSchema = new mongoose.Schema({
        email : {type: String, unique: true},
        password : String,
        role : {type: String, default: "User"},
        meta: {
            name: String,
            department: String,
            departmentRole: String,
            company: String,
            createdAt: Date
        },
        token: {
            tokenID: String,
            expDate: String,
            isVerified: {type: Boolean, default: false}
        },
        changePassword: {
            tokenID: {type: String, default: null},
            expDate: {type: String, default: ''}
        }
});


UserSchema.methods.isCorrectPassword = (password) => {
    bcrypt.compare(password, this.password, (err, same) => {
        if (err) {
            console.log(err);
        } else {
            console.log(err, same)
        }
    });
};

module.exports = mongoose.model('User', UserSchema);