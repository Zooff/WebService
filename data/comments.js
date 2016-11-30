'use strict';

var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var commentSchema = new mongoose.Schema({
  value : String,
  user : {
		type : String,
		ref : 'Users'
	},
});

commentSchema.plugin(autoIncrement.plugin, 'Comments');
var Comments = mongoose.model('Comments', commentSchema);



module.exports = Comments;
