/**
 *
 *  Helper functions for interacting with the user table
 *
**/


const bcrypt = require('bcryptjs');
const User = require('../models/user.js');


function createUser(name, password, cb) {
	let salt = bcrypt.genSaltSync();
	new User({ username: name, password: bcrypt.hashSync(password, salt) }).save().then(cb);
}


function getUser(name, password, cb) {
	new User({ username: name }).fetch().then(user => {
		if (user && bcrypt.compareSync(password, user.attributes.password)) {
			cb(user);
		} else {
			cb(null);
		}
	});
}


function userExists(name, cb) {
	new User({ username: name }).fetch().then(cb);
}


module.exports = { createUser, getUser, userExists };

