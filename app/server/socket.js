/**
 *
 *  Creates a socket.io instance that piggybacks off of our express server
 *
**/


const io = require('socket.io')(require('./expressServer'));







