const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 5000;
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('test'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

//require('./routes/passport-routes')(app);
require('./routes/index-routes')(app);
require('./routes/project-routes')(app);
require('./routes/auth-routes')(app);





if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'view/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    //res.sendFile(path.join(__dirname, 'view/build', 'index.html'));
  });
}

//###########################################################       Database connection        #################################################################
const databaseConfig = require("./database/config");
const databaseCredentials = require("./database/credentials");
const mongoose = require('mongoose');

mongoose.connect(
    'mongodb://' + databaseCredentials.login + ":" + databaseCredentials.pwd + '@' + databaseConfig.url + '/' + databaseCredentials.authDatabase,
    {useNewUrlParser: true, 
     useCreateIndex: true}
    );

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we are connected to database!");
});

//###########################################################     SANDBOX    ##############################################################################

const User = require('./model/user-model');

app.post('/api/register', function(req, res) {
console.log(req.body.email);

const newUser = new User();
newUser.email = req.body.email;
newUser.password = req.body.password;

newUser.save(function(err) {
  if (err) {
    res.status(500)
        .send("Error registering new user please try again.");
  } else {
    res.status(200).send("Sucessfully registered");
  }
  });
});

const jwt = require('jsonwebtoken');
const secret = 'mysecreetsshhh';


app.post('/api/authenticate', function(req, res) {
  const { email, password } = req.body;
  User.findOne({ email }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500)
          .json({
            error: 'Internal error please try again'
          });
    } else if (!user) {
      res.status(401)
          .json({
            error: 'Incorrect email or password'
          });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500)
              .json({
                error: 'Internal error please try again'
              });
        } else if (!same) {
          res.status(401)
              .json({
                error: 'Incorrect email or password'
              });
        } else {
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
          });
          console.log(token);
              res.cookie('token', token, { httpOnly: true }).sendStatus(200);
        }
      });
    }
  });
});
const withAuth = function(req, res, next) {
  const token =
      req.body.token ||
      req.query.token ||
      req.headers['x-access-token'] ||
      req.cookies.token;

  console.log(req.cookies);

  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
};

app.get('/checktoken', withAuth, (req, res)=>{
  res.sendStatus(200);
});

//###########################################################     SANDBOX     ##############################################################################


app.listen(port, () => console.log(`Listening on port ${port}`));
