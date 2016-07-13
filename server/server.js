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

var rootpath = path.normalize(__dirname + '/..');

//Creates instance of express object
var app = express();
app.use(bodyParser.json());
<<<<<<< HEAD
<<<<<<< HEAD
app.use(express.static(path.join(rootpath, 'client')));
=======
app.use(express.static('../client/'));
>>>>>>> f4e87e0b094cf7c8ea5bdb8c3c2b012d717b7c03
=======
app.use(express.static('../client/'));
>>>>>>> f4e87e0b094cf7c8ea5bdb8c3c2b012d717b7c03

app.get('/', function(req, res) {
	res.sendFile(path.join(rootpath, '/client/index.html'));
});

//this will be used for login page
app.post('/login', function(req, res) {
  Users.getUser(req.body.username, function(user) {
    user ? res.status(201).json(user) : res.sendStatus(404);
  });
});

//this is used to retrieve a list of all users for test purposes
app.get('/login', function(req, res) {
<<<<<<< HEAD
<<<<<<< HEAD
	res.sendFile(path.join(rootpath, '/client/index.html'));
=======
  res.sendFile(path.join(rootpath + '/client/index.html'));
>>>>>>> f4e87e0b094cf7c8ea5bdb8c3c2b012d717b7c03
=======
  res.sendFile(path.join(rootpath + '/client/index.html'));
>>>>>>> f4e87e0b094cf7c8ea5bdb8c3c2b012d717b7c03
});

//this will be used to signin
app.post('/signup', function(req, res) {
  Users.createUser(req.body.username, req.body.password, function(user) {
    res.status(201).json(user);
  });
});

//this will serve up the main chat page
app.get('/chat', function(req, res) {
  Messages.getAllMessages(function(collection) {
    res.status(200).json(collection);
  });
});

//this posts a message to the main chat page
app.post('/chat', function(req, res) {
  Messages.createMessage(req.body.content, req.body.username, req.body.color, function(collection) {
    res.status(201).json(collection);
  });
});

var port = process.env.PORT || 8080;

app.listen(port, function() {
<<<<<<< HEAD
<<<<<<< HEAD
	console.log("Listening on " + port);
=======
  console.log("Listening on " + port);
>>>>>>> f4e87e0b094cf7c8ea5bdb8c3c2b012d717b7c03
=======
  console.log("Listening on " + port);
>>>>>>> f4e87e0b094cf7c8ea5bdb8c3c2b012d717b7c03
});