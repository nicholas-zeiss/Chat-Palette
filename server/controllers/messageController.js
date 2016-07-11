/**
 *  Helper functions for looking at the message table
 */

var Message = require('../models/message.js');

exports.getAllMessages = function(callback) {
	console.log('got to getallmessages inner call');
	new Message().fetchAll().then(callback);
}

exports.createMessage = function(content, user, callback) {
	new Message({'content': content, 'username': user}).save().then(callback);
}