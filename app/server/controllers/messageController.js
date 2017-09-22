/**
 *
 *  Helper functions for interacting with the message table
 *
**/


const Message = require('../models/message.js');


function getAllMessages(cb) {
	new Message().fetchAll().then(cb);
}


function createMessage(content, user, color, cb) {
	new Message({content: content, username: user, color: color}).save().then(cb);
}


module.exports = { getAllMessages, createMessage };

