const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('test'));
app.use(cors());

var corsOptions = {
  origin: 'http://localhost:5000/',
  optionSuccessStatus: 200
};

require('./routes/passport-routes')(app);
require('./routes/index-routes')(app);
require('./routes/project-routes')(app);


if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'view/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    //res.sendFile(path.join(__dirname, 'view/build', 'index.html'));
  });
}

//###########################################################       Database connection        #################################################################
const databaseConfig = require("./database/config.js");
const databaseCredentials = require("./database/credentials.js");
const mongoose = require('mongoose');

mongoose.connect(
    'mongodb://' + databaseCredentials.login + ":" + databaseCredentials.pwd + '@' + databaseConfig.url + '/' + databaseCredentials.authDatabase, {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we are connected to database!");
});

//###########################################################     SANDBOX    ##############################################################################



// var User = require('./model/passport');
//
// var newUser = new User({
//   name: 'Lukas',
//   username: 'basic',
//   password: 'admin'
// });
//
// newUser.save(err=>{
//   if(err) throw err;
//
//   console.log('saved' + newUser);
// });



//###########################################################     SANDBOX     ##############################################################################


app.listen(port, () => console.log(`Listening on port ${port}`));
