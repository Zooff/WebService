'use strict';

var mongoose = require('mongoose');
var Groups = require('./groups.js');

exports.getAll = function(callback){
	Groups.find({}, function(err, groups){
		return callback(groups, null);
	});
}

exports.get = function(id, callback){
	Groups.findOne({_id : id}, function(err, group){
		return callback(group, null)
	});
}

exports.delete = function(id, callback){
	Groups.findOneAndRemove({_id : id}, function(err){
		if (err){
      		return callback({status : 500, message : 'Error: ' + err});
    	} else {
    		return callback('The group has been removed !');
    	}
	});
}

exports.create = function(newGr, callback){
	var newGroup = new Groups({ name : newGr.name, description : newGr.description, admin : newGr.admin, members : [newGr.admin], board : newGr.board })
	return newGroup.save(function(err, creGroup){
		if(err){
			return callback(null, {status : 500, message : 'Error ' + err});
		}
		if (creGroup) {
			return callback(creGroup, null);
		}
	});
}