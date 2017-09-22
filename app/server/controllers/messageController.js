/**
 *
 *  Helper functions for interacting with the message table
 *
**/


const Message = require('../models/message.js');


exports.createMessage  = function(content, user, color, cb) {
	new Message({content: content, username: user, color: color}).save().then(msg => {
		if (msg) {
			//unwrap message from Bookshelf model
			cb(msg.attributes);
		
		} else {
			//pass error to cb
			cb(msg);
		}
	});
};


exports.getAllMessages = function(cb) {
	new Message().fetchAll().then(msgs => {
		if (msgs) {
			//unwrap messages from Bookshelf collection
			cb(msgs.toArray().map(msg => msg.attributes));
		
		} else {
			//pass error to cb
			cb(msgs);
		}
	});
};

