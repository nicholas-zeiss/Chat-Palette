/**
 *
 *  Helper functions for interacting with the user table
 *
**/


const bcrypt = require('bcryptjs');
const User = require('../models/user.js');


exports.createUser = function(name, password, cb) {	
	new User({ username: name, password: bcrypt.hashSync(password) })
		.save()
		.then(user => {
			if (user) {
				cb(user.attributes);
			
			} else {
				cb(null);
			}
		});
};


exports.getUser = function(name, password, cb) {
	new User({ username: name })
		.fetch()
		.then(user => {
			if (user && bcrypt.compareSync(password, user.attributes.password)) {
				cb(user.attributes);
			
			} else {
				cb(null);
			}
		});
};


exports.userExists = function(name, cb) {
	new User({ username: name }).fetch().then(cb);
};

