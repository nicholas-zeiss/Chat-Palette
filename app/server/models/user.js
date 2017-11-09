/**
 *
 *	Creates a user model for bookshelf. 
 *
**/

const Bookshelf = require('../db.js');

module.exports = Bookshelf.Model.extend({ tableName: 'users' });

