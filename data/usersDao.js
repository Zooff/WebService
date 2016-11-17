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

exports.findById = function(id,callback){
  Users.findOne({_id : id}, function(err, user){
    if (err){
      return callback(null, {status : 500, message : 'Error : ' + err});
    }
    if (user){
      return callback(user, null);
    }
    return callback(null, {status : 404, message : 'Are you sure this user exist ?'});
  });
}

exports.addUser = function(newUser, callback){
  Users.findOne({email : newUser.email}, function(err,user){
    if (err){
      return callback(null, {status : 500, message : 'Error : ' + err});
    }
    if (user){
      return callback(null, {status : 409, message : 'This User already exist'});
    }
    var uservar = new Users({ email : newUser.email, firstname : newUser.firstname, lastname : newUser.lastname, biography : newUser.biography, registration : new Date().toJSON()});
    return uservar.save(function (err, creUser){
      if (err){
        return callback(null, {status : 500, message : 'Error : ' + err});
      }
      if (creUser){
        return callback(creUser, null);
      }
    });
  });
}
//
// exports.update();
