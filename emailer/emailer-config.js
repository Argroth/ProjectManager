const nodemailer = require('nodemailer');

//TODO Credentials to ENV variable
module.exports = transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    tls:{rejectUnauthorized: false},
    auth: {
        user: 'development@telemond-holding.com',
        pass: 'Muk65276'
    }
});