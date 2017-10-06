/**
 *
 *  Creates a socket.io instance that piggybacks off of our express server
 *
**/

const Messages = require('./controllers/messageController.js');
const server = require('./expressServer');

const io = require('socket.io')(server.app);
const socketioJwt = require('socketio-jwt');

io
	.on('connection', socketioJwt.authorize({
		secret: server.jwtSecret,
		timeout: 15000
	}))
	.on('authenticated', socket => {
		socket.on('message', msg => {
			console.log('received message from client');
			Messages.createMessage(msg, msg => {
				if (msg) {
					io.emit('message', msg);
				} else {
					socket.emit('500');
				}
			});
		});
	});

