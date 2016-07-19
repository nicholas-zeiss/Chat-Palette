/**
 *   Creates our schema for storing our app's data. We create two tables,
 *   one to store users and one to store their messages.
 */

var knex = require('knex')({            //Uncomment this to make this file work locally
  client: 'sqlite3',
  connection: {filename: './data/data.db'},
  useNullAsDefault: true
});

// var knex = require('knex')({         //Uncomment this to make this file work for heroku
//   client: 'postgresql',
//   connection: process.env.DATABASE_URL 
// });

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
      tabe.string('tableName');
      table.timestamps();
    });
  }
});

var Bookshelf = require('bookshelf')(knex);

module.exports = Bookshelf;
