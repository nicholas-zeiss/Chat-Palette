/**
 *   Creates our schema for storing our app's data. We create two tables,
 *   one to store users and one to store their messages.
 */

var path = require('path');
var sqlite3 = require('sqlite3');

var config;

if (!process.env.DATABASE_URL) {
  config = {
    client: 'postgresql',
    connection: process.env.DATABASE_URL 
  };
} else {
  config = {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, './data/data.sqlite')
    },
    useNullAsDefault: true
  }
}

var knex = require('knex')(config);


knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('username');
      table.string('password');
      table.timestamps();
    });
  }
});


knex.schema.hasTable('messages').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('messages', function(table) {
      table.increments('id').primary();
      table.string('content');
      table.string('username');
      table.string('color');
      table.string('tableName');
      table.timestamps();
    });
  }
});


module.exports = require('bookshelf')(knex);

