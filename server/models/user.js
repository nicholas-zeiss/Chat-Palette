/**
 *  Creates a user model for bookshelf. Is currently responsible
 *  for holding a username and password in plaintext.
 */

var Bookshelf = require('../db.js');
var Message = require('./message.js');

var User = Bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  messages: function() {
    return this.hasMany(Message);
  }
});

module.exports = User;