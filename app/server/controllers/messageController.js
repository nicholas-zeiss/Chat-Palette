/**
 *
 *  Helper functions for interacting with the message table
 *
**/


const Message = require('../models/message.js');


exports.createMessage = (msg, cb) => {
	new Message(msg)
		.save()
		.then(msg => cb(msg ? msg.attributes : null));		//return msg.attributes only to unwrap data from bookshelf wrapper	
};


exports.getAllMessages = cb => {
	new Message()
		.fetchAll()
		.then(msgs => {
			if (msgs) {
				cb(msgs
					.toArray()
					.map(msg => msg.attributes)			//again unwrap data
				);
			} else {
				cb(null);
			}
		});
};

