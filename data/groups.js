'use strict';

var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var groupsSchema = new mongoose.Schema({
	_id : String,
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
	board : [{
		type : String,
		ref : 'Comments'
	}]
}, {_id : false});

groupsSchema.plugin(autoIncrement.plugin, {model : 'Groups', field : '_id'});
var Groups = mongoose.model('Groups', groupsSchema);

module.exports = Groups;
