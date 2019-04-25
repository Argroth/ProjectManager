const nodemailer = require('nodemailer');

//TODO Credentials to ENV variable
module.exports = transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    tls:{rejectUnauthorized: false},
    auth: {
        user: 'dev@telemond-holding.com',
        pass: 'Bot91531'
    }
});