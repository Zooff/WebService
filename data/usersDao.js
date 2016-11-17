'use strict';

var mongoose = require('mongoose');
var Users = require('./users.js');

exports.FindAll = function(callback){
  Users.find({}, function(err, users){
    if (err){
      return callback(null,{status : 500, message : 'Error: ' + err});
    }
    if (users){
      return callback(users, null);
    }
    return callback(null,{status : 404, message : 'No User has ever signup'});
  });
}

exports.findById = function(id,julien){
  Users.findOne({firstname : id}, function(err, user){
    if (err){
      return julien(null, {status : 500, message : 'Error' + err});
    }
    if (user){
      return julien(user, null);
    }
    return julien(null, {status : 404, message : 'Are you sure this user exist ?'});
  });
}

// 
// exports.addUser();
//
// exports.update();
