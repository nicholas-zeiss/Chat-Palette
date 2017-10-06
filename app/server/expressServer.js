/**
 *
 *  Creates an express server that serves up our files and authorizes users
 *  to access the app. Authorization is done using a json web token and express-jwt is used to protect
 *  the /messages path from unauthorized users.
 *
 *	TODO: replace /messages path with socket.io
 *
**/


const bodyParser = require('body-parser');
const express = require('express');
// const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const path = require('path');

const Users = require('./controllers/userController.js');
const Messages = require('./controllers/messageController.js');

const app = express();
const jwtSecret = 'chat-pallette';


//----------------------
//	Express middleware
//----------------------
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../client')));

//any requests to /chat require the client attach a valid session token
// app.use('/messages', expressJwt({ secret: jwtSecret }));


//------------------
//	Express routes
//------------------
app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../index.html'));
});


//send client a session token if they provide valid login info
app.post('/login', (req, res) => {
	Users
		.getUser(req.body.username, req.body.password, user => {
			if (user) {
				res.status(200).json(jwt.sign(user, jwtSecret, { expiresIn: '1h' }));
			
			}	else {
				res.sendStatus(404);
			}
		});
});


//add new user to db and send client a session token
app.post('/signup', (req, res) => {
	Users
		.userExists(req.body.username, user => {
			if (user) {
				//username already exists in the database	
				res.sendStatus(400);
			
			} else {
				Users.createUser(req.body.username, req.body.password, user => {
					if (user) {
						res.status(201).json(jwt.sign(user, jwtSecret, { expiresIn: '1h' }));
					
					} else {
						//database error, unable to create new user
						res.sendStatus(500);
					}
				});
			}
		});
});


//retreive all messages stored in db
app.get('/messages', (req, res) => {
	Messages
		.getAllMessages(msgs => {
			if (msgs) {
				res.status(200).json(msgs);
			
			} else {
				res.sendStatus(500);
			}
		});
});

//TODO change to app.all ?
//redirect invalid paths
app.get('*', (req, res) => {
	res.redirect(301, '/');
});


//add a message to the database
// app.post('/messages', (req, res) => {
// 	//in case someone tries to post from outside the app w/ invalid data
// 	if (!/red|blue|green|yellow|clear/.test(req.body.color)) {
// 		res.sendStatus(400);
// 	}

// 	Messages
// 		.createMessage(req.body.content, req.body.username, req.body.color, msg => {
// 			if (msg) {
// 				res.sendStatus(201);
			
// 			} else {
// 				//database error
// 				res.sendStatus(500);
// 			}
// 		});
// });


//initialize server and socket connection
const port = 8080;

//export express so it can be used by socket.io
exports.app = app.listen(port);
exports.jwtSecret = jwtSecret;

