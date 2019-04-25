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
app.use(express.static('test'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

require('./routes/auth-routes')(app);
require('./routes/panel-routes')(app);
require('./routes/project-routes')(app);





if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'view/build')));

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    //res.sendFile(path.join(__dirname, 'view/build', 'index.html'));
  });
}

//###########################################################       Database connection        #################################################################
const databaseConfig = require("./database/config");
const databaseCredentials = require("./database/credentials");
const mongoose = require('mongoose');
const db = mongoose.connection;


//TODO add `` syntax
mongoose.connect(
    'mongodb://' + databaseCredentials.login + ":" + databaseCredentials.pwd + '@' + databaseConfig.url + '/' + databaseCredentials.authDatabase,
    {useNewUrlParser: true,
     useCreateIndex: true}
    );


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("we are connected to the database!");
});

//###########################################################     SANDBOX    ##############################################################################

const middleware = require('./middlewares/auth-middleware');

app.get('/checktoken', middleware.withAuth ,(req, res)=>{
  res.sendStatus(200);
});


//###########################################################     SANDBOX     ##############################################################################


app.listen(port, () => console.log(`Listening on port ${port}`));
