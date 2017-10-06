/**
 *
 *  Creates a socket.io instance that piggybacks off of our express server. Clients
 *	must be authorized using a JSONWebToken. Responsible for creating messages sent
 *	by a client and then distributing to all active clients.
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
			Messages.createMessage(msg, msg => {
				if (msg) {
					io.emit('message', msg);
				} else {
					//if db fails to create message notify only the socket that sent it
					socket.emit('500');
				}
			});
		});
	});

