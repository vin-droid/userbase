const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

// routes
require('./routes/user.routes')(app);
require('./routes/player.routes')(app);
require('./routes/shared.routes')(app);

// database 
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url).then(()=>{console.log("connected to db");}).catch((err)=>{console.log("error occured",err);process.exit();});

// listen for requests
app.listen(4000, () => {
    console.log("Server is listening on port 4000");
});