'use strict';

var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var commentSchema = new mongoose.Schema({
  value : String,
  user : {
		type : String,
		ref : 'Users'
	},
  group : {
    type : String,
    ref : 'Groups'
  }
});

usersSchema.plugin(autoIncrement.plugin, 'Users');
var Comments = mongoose.model('Users', commentSchema);



module.exports = Comments;
