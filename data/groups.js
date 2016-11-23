'use strict';

var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var groupsSchema = new mongoose.Schema({
	name : String,
	description : String,
	admin : {
		type : String,
		ref : 'Users'
	},
	members : [{
		type : String,
		ref : 'Users'
	}],
	board : String
})

groupsSchema.plugin(autoIncrement.plugin, 'Groups');
var Groups = mongoose.model('Groups', groupsSchema);

module.exports = Groups;
