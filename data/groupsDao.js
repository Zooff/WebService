'use strict';

var mongoose = require('mongoose');
var Groups = require('./groups.js');
var _ = require('lodash');

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
	var newGroup = new Groups({ name : newGr.name, description : newGr.description, admin : newGr.admin, members : [newGr.admin], board : [] })
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


exports.getComments = function(idGroup, callback){
	Groups.findOne({_id : idGroup}, function(err, group){
		if(err){
			return callback(null, {status : 500, message : 'Error : ' + err});
		}
		if(group){
			return callback(group.board, null);
		}
		return callback(null, {status : 404, message : 'Are you sure this groups exist ?'});
	});
}

exports.getComment = function(idGroup, idComment, callback) {
	Groups.findOne({_id : idGroup}, function(err, group){
		if(err){
			return callback(null, {status : 500, message : 'Error : ' + err});
		}
		if(group){

			var comment = _.find(group.board, {_id : idComment});

			console.log(comment);

			if (comment){
				return callback(comment, null);
			}
			return callback(null, {status : 404, message : 'Are you sure this comment exist ?'});
		}
	//	return callback(null, {status : 404, message : 'Are you sure this groups exist ?'});
	});
}

exports.addComment = function(idGroup, comment, callback){
	Groups.findOne({_id : idGroup}, function(err, group){
		if(err){
			return callback(null, {status : 500, message : 'Error ' + err});
		}
		if(group){
			var newComment = {_id : group.board.length, value : comment.value, user : comment.user, date : new Date().toJSON()};
			console.log(newComment);
			group.board.push(newComment);
			return group.save(function(err, groupModif){
				if(err){
					return callback(null, {status : 500, message : 'Error Push Message : ' + err});
				} else {
					return callback(groupModif, null);
				}
			});
		}
	//	return callback(null, {status : 404, message : 'Are you sure this Group exist ?'})
	});
}


exports.removeComment = function(idGroup, idComment, callback){
	Groups.findOne({_id : idGroup}, function(err, group){
		if(err){
			return callback(null, {status : 500, message : 'Error ' + err});
		}
		if(group){
			var index = _.findIndex(group.board, {_id : idComment});
			console.log(index);
			if (index > -1){
				group.board.splice(index, 1);
				return group.save(function(err, groupModif){
					if(err){
						return callback(null, {status : 500, message : 'Error ' + err});
					}
					return callback(groupModif, null);
				});
			}
			return callback(null, {status : 404, message : 'This Comment doesnt exist'});
		}
		return callback(null, {status : 404, message : 'Are you sure this Group exist ?'});
	});
}

exports.updateComment = function(idGroup, idComment, value, callback){
	Groups.findOne({_id : idGroup}, function(err, group){
		if (err){
			return callback(null, {status : 500, message : 'Error ' + err});
		}
		if (group){
			var comment = _.find(group.board, {_id : idComment});
			if (comment){
				comment.value = value;
				return callback(comment, null)
			}
			return callback(null, {status : 404, message : 'This Comment doesnt exist'});
		}
		return callback(null, {status : 404, message : 'Are you sure this Group exist ?'});
	});
}
