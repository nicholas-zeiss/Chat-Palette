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
const tokenSecret = 'chat-pallette';



//Middleware
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../client')));

app.use('/chat', expressJwt({ secret: tokenSecret }));



//Routes
app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../index.html'));
});


app.get('/chat', (req, res) => {
	Messages.getAllMessages(msgs => {
		if (msgs) {
			res.status(200).json(msgs);
		
		} else {
			res.sendStatus(500);
		}
	});
});


app.post('/login', (req, res) => {
	Users.getUser(req.body.username, req.body.password, user => {
		if (user) {
			res.status(201).json({
				token: jwt.sign(user, tokenSecret, { expiresIn: '1h' }),
				username: user.username
			});
		
		}	else {
			res.sendStatus(404);
		}
	});
});


app.post('/signup', (req, res) => {
	Users.userExists(req.body.username, user => {
		if (user) {		
			//username already exists in the database	
			res.sendStatus(400);
		
		} else {
			Users.createUser(req.body.username, req.body.password, user => {
				if (user) {
					let token = jwt.sign(user, tokenSecret, { expiresIn: '1h' });
					res.status(201).json({ token });
				
				} else {
					res.sendStatus(500);
				}
			});
		}
	});
});


app.post('/chat', (req, res) => {
	//in case someone tries to post from outside the app w/ invalid data
	if (!/red|blue|green|yellow|clear/.test(req.body.color)) {
		res.sendStatus(400);
	}


	Messages.createMessage(req.body.content, req.body.username, req.body.color, msg => {
		if (msg) {
			res.sendStatus(201);
		
		} else {
			res.sendStatus(500);
		}
	});
});


//initialize server
let port = 8080;

app.listen(port, () => console.log('Listening on ', port));

