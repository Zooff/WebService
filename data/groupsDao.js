'use strict';

var mongoose = require('mongoose');
var Groups = require('./groups.js');
var Comments = require('./comments.js');

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
    		return callback(null);
    	}
	});
}

exports.create = function(newGr, callback){
	if (!newGr.description){
		newGr.description = "Description of group " + newGr.name;
	}
	var newGroup = new Groups({ name : newGr.name, description : newGr.description, admin : newGr.admin, members : [newGr.admin], board : ["First Message"] })
	return newGroup.save(function(err, group){
		if(err){
			return callback(null, {status : 500, message : 'Error ' + err});
		}
		if (group) {
			return callback(group, null);
		}
	});
}

exports.updateGr = function(id, newGr, callback){
	Groups.findOne({_id : id}, function(err, group){
		if(err){
			return callback(null, {status : 500, message : 'Error ' + err});
		}
		if (group) {
			group.name = newGr.name;
			group.description = newGr.description;
			group.admin = newGr.admin;
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
			return callback(null, {status : 500, message : 'Error Find Group : ' + err});
		}
		if(group){
			if (group.members.indexOf(idUser) > -1){
				return callback(null, {status : 409, message : 'User already in the group'});
			}
			group.members.push(idUser);
			return group.save(function(err, groupModif){
				if(err){
					return callback(null, {status : 500, message : 'Error Save : ' + err});
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


exports.addComment = function(idGroup, comment, callback){
	Groups.findOne({_id : idGroup}, function(err, group){
		if(err){
			return callback(null, {status : 500, message : 'Error ' + err});
		}
		if(group){
			var newComment = new Comments ({
				value : comment.value,
				author : comment.user,
				date : new Date().toJSON()
			});
			newComment.save(function(err, saveComment) {
				if (err){
					return callback(null, {status : 500, message : 'Error Create Message : ' + err});
				}
				else {
					group.board.push(saveComment);
					return group.save(function(err, groupModif){
						if(err){
							return callback(null, {status : 500, message : 'Error Push Message : ' + err});
						} else {
							return callback(groupModif, null);
						}
					});
				}
			});
		}
	});
}
