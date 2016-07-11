/**
 *  Creates a message model for bookshelf. Is responsible for
 *  holding the message content and relative key of the user
 *  responsible for the message
 */

var Bookshelf = require('../db.js');

var Message = Bookshelf.Model.extend({
	tablename: 'messages',
	hasTimestamps: true
});

module.exports = Message;