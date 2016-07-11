/**
 *  Creates a user model for bookshelf. Is currently responsible
 *  for holding a username and password in plaintext.
 */ 

var Bookshelf = require('../db.js');

var User = Bookshelf.Model.extend({
	tablename: 'users',
	hasTimestamps: true
})

module.exports = User;