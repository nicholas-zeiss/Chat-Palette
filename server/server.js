/**
 *   This is the server file that will serve up all of
 *   our front end pages based on which endpoints are
 *   being fired and will also handle any database manipulation
 */

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');

var db = require('./db.js');
var Users = require('./controllers/userController.js');
var Messages = require('./controllers/messageController.js');
var util = require('./lib/utility.js')

var rootpath = path.normalize(__dirname + '/..');

//Creates instance of express object and our session
var app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(rootpath, 'client')));
app.use(session({
  secret: 'shh',
  resave: false,
  saveUninitialized: true
}));

app.get('/', util.checkUser, function(req, res) {
	res.sendFile(path.join(rootpath, '/client/index.html'));
});

app.get('/logout'), function(req, res) {
  console.log('Im logging out!');
  req.session.destroy(function() {
    res.redirect('/login');
  })
}

//this will be used for login page
app.post('/login', function(req, res) {
  Users.getUser(req.body.username, function(user) {
    if (!!user && util.comparePasswords(req.body.password, user.get('password'))) {
      util.createSession(req, res, user.get('username'));
      // res.redirect('/chat');
    } else {
      console.log('error')
      res.redirect('/login');
    }
  });
});

//this will be used to create a new account
app.post('/signup', function(req, res) {
  Users.createUser(req.body.username, req.body.password, function(user) {
    util.createSession(req, res, user.get('username'));
    // res.redirect('/chat');
  });
});

//this will serve up the main chat page
app.get('/chat', util.checkUser, function(req, res) {
  console.log('in chat get', req.session);
  Messages.getAllMessages(function(collection) {
    res.status(200).json(collection);
  });
});

//this posts a message to the main chat page
app.post('/chat', util.checkUser, function(req, res) {
  Messages.createMessage(req.body.content, req.body.username, req.body.color, function(model) {
    res.status(201).json(model);
  });
});

var port = process.env.PORT || 8080;

app.listen(port, function() {
  console.log(port);
});