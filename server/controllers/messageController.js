/**
 *  Helper functions for looking at the message table
 */

exports.getAllMessages = function(callback) {
	new Message.fetchAll().then(callback);
}

exports.createMessage = function(content, user, callback) {
	new Message({'content': content, 'username': user}).save().then(callback);
}