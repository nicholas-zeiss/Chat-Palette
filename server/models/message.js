/**
 *  Creates a message model for bookshelf. Is responsible for
 *  holding the message content and relative key of the user
 *  responsible for the message
 */

var Bookshelf = require('../db.js');
var User = require('./user.js');

var Message = Bookshelf.Model.extend({
	tableName: 'messages',
	hasTimestamps: true,
	user: function() {
		return this.hasOne(User);
	}
});

module.exports = Message;