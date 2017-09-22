/**
 *
 *  Creates a server that serves up our files and allows clients to interact with database
 *
**/

const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const Users = require('./controllers/userController.js');
const Messages = require('./controllers/messageController.js');


const app = express();

//Middleware
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../client')));


//Routes
app.get('/', function(req, res) {
	res.sendFile(path.resolve(__dirname, '../index.html'));
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
  console.log(req.body)
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

