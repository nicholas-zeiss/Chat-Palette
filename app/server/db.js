/**
 *
 *  Creates our tables and schema for our db. We create two tables,
 *  one to store users and one to store their messages.
 *
**/


const path = require('path');
const knex = require('knex')({
	client: 'sqlite3',
	connection: {
		filename: path.resolve(__dirname, './data/data.sqlite')
	},
	useNullAsDefault: true
});


// create the tables if they do not exist
knex.schema.hasTable('users').then(exists => {
	if (!exists) {
		return knex.schema.createTable('users', table => {
			table.increments('id').primary();
			table.string('username');
			table.string('password');
		});
	}
});

knex.schema.hasTable('messages').then(exists => {
	if (!exists) {
		return knex.schema.createTable('messages', table => {
			table.increments('id').primary();
			table.string('content');
			table.string('username');
			table.string('color');
			table.timestamps();
		});
	}
});


module.exports = require('bookshelf')(knex);

