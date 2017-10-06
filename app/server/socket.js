/**
 *
 *  Creates a socket.io instance that piggybacks off of our express server
 *
**/

const server = require('./expressServer');

const io = require('socket.io')(server.app);
const socketioJwt = require('socketio-jwt');

io.sockets
	.on('connection', socketioJwt.authorize({
		secret: server.jwtSecret,
		timeout: 15000
	}))
	.on('authenticated', messageHandler);


function messageHandler(socket) {
	console.log('client authenticated', socket);
}



