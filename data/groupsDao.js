'use strict';

var mongoose = require('mongoose');
var Groups = require('./groups.js');

exports.getAll = function(callback){
	Groups.find({}, function(err, groups){
		return callback(groups, null);
	})
}

exports.get = function(id, callback){
	Groups.findOne({_id : id}, function(err, group){
		return callback(group, null)
	})
}

exports.delete = function(id, callback){
	Groups.findOneAndRemove({_id : id}, function(err){
		if (err){
      		return callback({status : 500, message : 'Error: ' + err});
    	} else {
    		return callback('The group has been removed !');
    	}
	})
}