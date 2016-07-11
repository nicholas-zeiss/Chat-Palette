/**
 *   This is the server file that will serve up all of
 *   our front end pages based on which endpoints are
 *   being fired and will also handle any database manipulation
 */

var express = require('express');
var path = require('path');
var db = require('./db.js');

//Creates instance of express object
var app = express();

var rootpath = path.normalize(__dirname + '/..');

//this will serve up the hompage aka index
app.get('/', function(req, res) {
  res.redirect('/chat'); 
});

//this will be used for login page
app.post('/login', function(req, res) {


});

app.post('/signup', function(req, res) {


});

//this will serve up the main chat page
app.get('/chat', function(req, res) {


});

app.post('/chat', function(req, res) {


});

var port = process.env.PORT || 8080;

app.listen(port, function() {
	console.log("Listening on " + port);
});
