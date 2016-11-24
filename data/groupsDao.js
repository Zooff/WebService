'use strict';

var mongoose = require('mongoose');
var Groups = require('./groups.js');

exports.getAll = function(callback){
	Groups.find({}, function(err, groups){
		if(err){
			return callback(null, {status : 500, message : 'Error : ' + err});
		} else {
			return callback(groups, null);
		}
	});
}

exports.get = function(id, callback){
	Groups.findOne({_id : id}, function(err, group){
		if(err){
			return callback(null, {status : 500, message : 'Error : ' + err});
		} else {
			return callback(group, null)
		}
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
	return newGroup.save(function(err, group){
		if(err){
			return callback(null, {status : 500, message : 'Error ' + err});
		}
		if (group) {
			return callback(group, null);
		}
	});
}

exports.updateDesc = function(id, newDesc, callback){
	Groups.findOne({_id : id}, function(err, group){
		if(err){
			return callback(null, {status : 500, message : 'Error ' + err});
		} 
		if (group) {
			group.description = newDesc;
			return group.save(function(err, groupModif){
				if(err){
					return callback(null, {status : 500, message : 'Error ' + err});
				} else {
					return callback(groupModif, null);
				}
			});
		}
	});
}

exports.joinGroup = function(idGroup, idUser, callback){
	Groups.findOne({_id : idGroup}, function(err, group){
		if(err){
			return callback(null, {status : 500, message : 'Error ' + err});
		}
		if(group){
			group.members.push(idUser);
			return group.save(function(err, groupModif){
				if(err){
					return callback(null, {status : 500, message : 'Error ' + err});
				} else {
					return callback(groupModif, null);
				}
			});
		}
	});
}

exports.leaveGroup = function(idGroup, idUser, callback){
	Groups.findOne({_id : idGroup}, function(err, group){
		if(err){
			return callback(null, {status : 500, message : 'Error ' + err});
		}
		if(group){
			group.members.remove(idUser);
			return group.save(function(err, groupModif){
				if(err){
					return callback(null, {status : 500, message : 'Error ' + err});
				} else {
					return callback(groupModif, null);
				}
			});
		}
	});
}
