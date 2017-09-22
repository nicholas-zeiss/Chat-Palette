/**
 *
 *  Creates a server that serves up our files and allows clients to interact with database. Authorization is done using a session token.
 *  Session tokens are created using jsonwebtoken, and express-jwt is used to protect the /chat path from unauthorized users.
 *
**/


const bodyParser = require('body-parser');
const express = require('express');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const path = require('path');

const Users = require('./controllers/userController.js');
const Messages = require('./controllers/messageController.js');

const app = express();

//secret for our tokens
const secret = 'chat-pallette';


//Middleware
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../client')));

app.use('/chat', expressJwt({ secret }));


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
			res.status(201).json({
				token: jwt.sign(user.attributes, secret, { expiresIn: '1h' }),
				username: user.attributes.username
			});
		
		}	else {
			res.sendStatus(404);
		}
	});
});


app.post('/signup', (req, res) => {
	Users.userExists(req.body.username, user => {
		if (user) {		
			//when user is not null that username already exists in the database	
			res.sendStatus(400);
		
		} else {
			Users.createUser(req.body.username, req.body.password, user => {
				if (user) {
					res.status(201).json({
						token: jwt.sign(user.attributes, secret, { expiresIn: '1h' }),
						username: user.attributes.username
					});
				
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

