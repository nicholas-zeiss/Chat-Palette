/**
 *  Helper functions for interacting with the user table
 */

exports.getUser = function(name, callback) {
	new User({'username': name}).fetch.then(callback);
}

exports.createUser = function(name, password, callback) {
	new User({'username': name, 'password': password}).save().then(callback);
}