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
app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../index.html'));
});


app.get('/chat', (req, res) => {
	Messages.getAllMessages(msgs => res.status(200).json(msgs));
});


app.post('/login', (req, res) => {
	Users.getUser(req.body.username, req.body.password, user => {
		if (user) {
			res.status(201).json(user.username);
		}	else {
			res.sendStatus(404);
		}
	});
});


app.post('/signup', (req, res) => {
	Users.userExists(req.body.username, user => {
		if (user) {			
			res.sendStatus(400);
		} else {
			Users.createUser(req.body.username, req.body.password, user => {
				if (user) {
					res.status(201).json(user.username);
				} else {
					res.sendStatus(500);
				}
			});
		}
	});
});


app.post('/chat', (req, res) => {
	Messages.createMessage(req.body.content, req.body.username, req.body.color, () => res.sendStatus(201));
});


//initialize server
let port = 8080;

app.listen(port, () => console.log('Listening on ', port));

