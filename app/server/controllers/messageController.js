/**
 *
 *  Helper functions for interacting with the message table
 *
**/


const Message = require('../models/message.js');


exports.createMessage  = function(content, user, color, cb) {
	new Message({content: content, username: user, color: color}).save().then(msg => {
		if (msg) {
			cb(msg.attributes);	//unwrap messages from Bookshelf collection

		} else {
			cb(null);
		}
	});
};


exports.getAllMessages = function(cb) {
	new Message().fetchAll().then(msgs => {
		if (msgs) {
			cb(msgs.toArray().map(msg => msg.attributes));	//unwrap messages from Bookshelf collection
		
		} else {
			cb(null);
		}
	});
};

