/**
 *   Creates our schema for storing our app's data. We create two folders,
 *   one to store users and one to store their messages.
 */

var knex = require('knex')({
	client: 'sqlite3',
	connection: { filename: './data/data.db' },
	useNullAsDefault: true
});


var Bookshelf = require('Bookshelf')(knex);

// Creates our user table
knex.schema.createTableIfNotExists('users', function(table) {
	table.increments();
	table.string('username');
	table.string('password');
	table.timestamps();
});

// Creates our messages table
knex.schema.createTableIfNotExists('messages', function(table) {
	table.increments();
	table.string('content');
	table.string('username');
	table.timestamps();
});

module.exports = Bookshelf;