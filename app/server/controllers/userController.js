/**
 *
 *  Helper functions for interacting with the user table
 *
**/


const bcrypt = require('bcryptjs');
const User = require('../models/user.js');


exports.createUser = (username, password, cb) => {
	new User({
		username,
		password: bcrypt.hashSync(password)
	})
		.save()
		.then(user => {
			if (user) {
				cb(user.attributes);
			
			} else {
				cb(null);
			}
		});
};


exports.getUser = (username, password, cb) => {
	new User({ username })
		.fetch()
		.then(user => {
			if (user && bcrypt.compareSync(password, user.attributes.password)) {
				cb(user.attributes);
			
			} else {
				cb(null);
			}
		});
};


exports.userExists = (username, cb) => {
	new User({ username }).fetch().then(cb);
};

