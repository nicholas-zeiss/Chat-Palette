/**
 *  Helper functions for looking at the message table
 */

var Message = require('../models/message.js');

exports.getAllMessages = function(callback) {
	new Message().fetchAll().then(callback);
}

exports.createMessage = function(content, user, color, callback) {
	new Message({'content': content, 'username': user, 'color': color}).save().then(callback);
}