const express = require('express');
const bodyParser = require('body-parser');

// Create express app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use((req, res, next) => {
  const origin = req.get('origin');

  // TODO Add origin validation
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma');

  // intercept OPTIONS method
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
  } else {
    next();
  }
});
// Database configuration
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
// Get mongoose to use globle promises
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url).then(()=>{console.log("connected to db");}).catch((err)=>{console.log("error occured",err);process.exit();});
// Get the default connection
var db = mongoose.connection;
// routes
require('./routes/user.routes')(app, db);
require('./routes/player.routes')(app, db);
require('./routes/shared.routes')(app, db);

// listen for requests
app.listen(4000, () => {
    console.log("Server is listening on port 4000");
});