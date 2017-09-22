/**
 *
 *  Creates a server that sends the app and allows us to interact with the database
 *
**/

var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');

var db = require('./db.js');
var Users = require('./controllers/userController.js');
var Messages = require('./controllers/messageController.js');


var rootpath = path.normalize(__dirname + '/..');

var app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(rootpath, 'client')));


/**
 *
 *  Set up routes
 *
**/

app.get('/', function(req, res) {
  res.sendFile(path.join(rootpath, '/client/index.html'));
});


app.get('/login', function(req, res) {
  res.sendFile(path.join(rootpath, '/client/index.html'));
});


app.get('/chat', function(req, res) {
  Messages.getAllMessages(function(collection) {
    res.status(200).json(collection);
  });
});


app.post('/login', function(req, res) {
  Users.getUser(req.body.username, function(user) {
    user ? res.status(201).json(user) : res.sendStatus(404);
  });
});


app.post('/signup', function(req, res) {
  Users.createUser(req.body.username, req.body.password, function(user) {
    res.status(201).json(user);
  });
});


app.post('/chat', function(req, res) {
  Messages.createMessage(req.body.content, req.body.username, req.body.color, 'messages', function(collection) {
    res.status(201).json({});
  });
});


/**
 *
 *  Initialize server
 *
**/

var port = process.env.PORT || 8080;

app.listen(port, function() {
  console.log('Listening on ', port);
});

