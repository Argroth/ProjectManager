const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');
const saltRounds = 10;

const userSchema = mongoose.Schema({
        email : String,
        password : String,
        role : {type: String, default: "User"}
});

userSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, saltRounds, null);
};

userSchema.methods.validPassword = (password) => {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);