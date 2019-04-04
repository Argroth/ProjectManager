// const mongoose = require('mongoose');
// const bcrypt   = require('bcrypt');
// const saltRounds = 10;
//
// const userSchema = mongoose.Schema({
//         email : {type: String, unique: true},
//         password : String,
//         role : {type: String, default: "User"},
//         meta: {
//             name: String,
//             department: String,
//             departmentRole: String,
//             company: String,
//             createdAt: Date
//         },
//         token: {
//             tokenID: String,
//             expDate: Date,
//             isVerified: {type: Boolean, default: false}
//         },
//         changePassword: {
//             tokenID: String,
//             expDate: Date
//         }
// });
//
// userSchema.methods.generateHash = (password) => {
//     return bcrypt.hashSync(password, saltRounds, null);
// };
//
// userSchema.methods.validPassword = (password) => {
//     return bcrypt.compareSync(password, this.local.password);
// };
//
// module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
    email: String,
    password: String
});

UserSchema.pre('save', function(next) {
    // Check if document is new or a new password has been set
    if (this.isNew || this.isModified('password')) {
        // Saving reference to this because of changing scopes
        const document = this;
        bcrypt.hash(document.password, saltRounds,
            function(err, hashedPassword) {
                if (err) {
                    next(err);
                }
                else {
                    document.password = hashedPassword;
                    next();
                }
            });
    } else {
        next();
    }
});

UserSchema.methods.isCorrectPassword = function(password, callback){
    bcrypt.compare(password, this.password, function(err, same) {
        if (err) {
            callback(err);
        } else {
            callback(err, same);
        }
    });
}
module.exports = mongoose.model('User', UserSchema);