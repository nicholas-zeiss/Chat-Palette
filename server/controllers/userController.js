/**
 *  Helper functions for interacting with the user table
 */

var bcrypt = require('bcryptjs');
var User = require('../models/user.js');

exports.getUsers = function(callback) {
  new User().fetchAll().then(callback);
};

exports.getUser = function(name, callback) {
  new User({username: name}).fetch().then(callback);
};

exports.createUser = function(name, password, callback) {
	console.log('in create user ', name, password);
  new User({username: name, password: bcrypt.hashSync(password, 10)}).save().then(callback);
};