/**
 *  Helper functions for interacting with the user table
 */
var User = require('../models/user.js');

exports.getUsers = function(callback) {
	new User().fetchAll().then(callback).catch(function(err) {
		console.log(err);
	});
}


exports.getUser = function(name, callback) {
	new User({'username': name}).fetch.then(callback);
}

exports.createUser = function(name, password, callback) {
	new User({'username': name, 'password': password}).save().then(callback);
}