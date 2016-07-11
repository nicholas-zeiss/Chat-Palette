
var knex = require('knex')({
	client: 'sqlite3',
	connection: { filename: './data/data.db' },
	useNullAsDefault: true
});


var Bookshelf = require('Bookshelf')(knex);

// Creates our user table
knex.schema.createTableIfNotExists('users', function(table) {
	table.increments();
	table.string('usernmame');
	table.string('password');
	table.timestamps();
});

// Creates our messages table
knex.schema.createTableIfNotExists('messages', function(table) {
	table.increments();
	table.string('content');
	table.integer('user rel id');
	table.timestamps();
});

module.exports = Bookshelf;