// server/main.js

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var path = require('path');

// Get the database config
var db = require('./src/config/db');

// Set the port
var port = process.env.PORT || 8080;

// Connect to the db
mongoose.connect(db.url);

// Set up all data of body POST parameters
app.use(bodyParser.json());   // application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));   // application/vnd.api+json
app.use(bodyParser.urlencoded({ extended: true }));   // application/x-www-form-urlencoded

// Set the X-HTTP-Method-Override header
app.use(methodOverride('X-HTTP-Method-Override'));

// Set the static file path
app.use(express.static(path.resolve('./client/www')));

// Configure the routes
require('./src/routes')(app);

// Start the app and export it
app.listen(port);
console.log("App running on port " + port);
exports = module.exports = app;