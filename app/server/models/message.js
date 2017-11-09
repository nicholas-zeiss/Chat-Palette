/**
 *
 *  Creates a message model for bookshelf for our db
 *
**/

const Bookshelf = require('../db.js');

module.exports = Bookshelf.Model.extend({
	tableName: 'messages',
	hasTimestamps: true
});

