const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//controller declaration
const index_controller = require('./controller/index-controller.js');

//controller usage
app.get('/nudes', index_controller.index);

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'view/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'view/build', 'index.html'));
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

app.listen(port, () => console.log(`Listening on port ${port}`));
