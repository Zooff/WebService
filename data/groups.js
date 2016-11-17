'use strict';

var mongoose = require('mongoose');

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
var Groups = mongoose.model('Groups', groupsSchema);

module.exports = Groups;