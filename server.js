const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 5000;
const path = require('path');
const bodyParser = require('body-parser');

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
require('./routes/calendar-routes')(app);





if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'view/build')));

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    //res.sendFile(path.join(__dirname, 'view/build', 'index.html'));
  });
}

//###########################################################       Database         ######################################################################
const databaseConfig = require("./database/config");
const databaseCredentials = require("./database/credentials");
const mongoose = require('mongoose');
const db = mongoose.connection;



mongoose.connect(
    `mongodb://${databaseCredentials.login}:${databaseCredentials.pwd}@${databaseConfig.url}/${databaseCredentials.authDatabase}`,
    {useNewUrlParser: true,
     useCreateIndex: true}
    );


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("we are connected to the database!");
});

//###########################################################     SANDBOX    ##############################################################################
const io = require('socket.io')(80);

const notifications = [
  {
    type: "important",
    title: "Update completed",
    description: "Restart server 12 to complete the update.",
    time: "2h ago"
  },
  {
    type: "default",
    title: "Lorem ipsum",
    description: "Aliquam ex eros, imperdiet vulputate hendrerit et.",
    time: "6h ago"
  },
  {
    type: "login",
    title: "Login from 192.186.1.1",
    description: "",
    time: "6h ago"
  },
  {
    type: "request",
    title: "New connection",
    description: "Anna accepted your request.",
    time: "12h ago"
  }
];

io.on('connection',  (socket) => {
  socket.emit('news', notifications);
  socket.on('my other event', (data) => {
    const newMessage = [...notifications, data];

    io.emit('news', newMessage);
  });
});

//###########################################################     SANDBOX     ##############################################################################


app.listen(port, () => console.log(`Listening on port ${port}`));
