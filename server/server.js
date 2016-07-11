/**
 *   This is the server file that will serve up all of
 *   our front end pages based on which endpoints are
 *   being fired and will also handle any database manipulation
 */

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var db = require('./db.js');
var Users = require('./controllers/userController.js');
var Messages = require('./controllers/messageController.js');

//Creates instance of express object
var app = express();

var rootpath = path.normalize(__dirname + '/..');

//this will serve up the hompage
app.get('/', function(req, res) {
  res.redirect('/chat'); 
});

//this will be used for login page
app.post('/login', function(req, res) {
	var user = Users.getUser(req.body.username);
	user ? res.status(201).json(user) : res.sendStatus(404);
});

//this will be used to signin
app.post('/signup', function(req, res) {
  res.status(201).json(Users.createUser(req.body.username, req.body.password, function(user) {
  	return user;
  }));
});

//this will serve up the main chat page
app.get('/chat', function(req, res) {
	res.status(200).json(Messages.getAllMessages(function(collection) {
		console.log(collection);
		return collection;
	}));
});

//this posts a message to the main chat page
app.post('/chat', function(req, res) {
	res.status(201).json(Messages.createMessage(req.body.content, req.body.username, function(message) {
		return message;
	}));
});

var port = process.env.PORT || 8080;

app.listen(port, function() {
	console.log("Listening on " + port);
});
