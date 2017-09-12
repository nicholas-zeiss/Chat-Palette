/**
 *  Helper functions for interacting with the message table
**/

var Message = require('../models/message.js');

exports.getAllMessages = function(callback) {
  new Message().fetchAll().then(callback);
};

exports.createMessage = function(content, user, color, tableName, callback) {
  new Message({content: content, username: user, color: color, tableName: tableName}).save().then(callback);
};

