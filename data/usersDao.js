'use strict';

var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var config = require('../config.js');
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
    var uservar = new Users({ email : newUser.email, firstname : newUser.firstname, lastname : newUser.lastname, password : newUser.password, biography : newUser.biography, registration : new Date().toJSON()});
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

exports.update = function(id, modifiedUser, callback){
  Users.findOne({_id : id}, function (err,user){
    if (err){
      return callback(null, {status : 500, message : 'Error : ' + err});
    }
    if (user){
      if (modifiedUser.firstname)
        user.firstname = modifiedUser.firstname;
      if (modifiedUser.lastname)
        user.lastname = modifiedUser.lastname;
      if (modifiedUser.biography)
        user.biography = modifiedUser.biography;
      return user.save(function (err, mUser){
        if (err){
          return callback(null, {status : 500, message : 'Error : ' + err});
        }
        if (mUser){
          return callback(mUser, null);
        }
      });
    }
    return callback(null, {status : 404, message : 'Are you sure this user exist ?'});
  });
}

exports.removeUser = function(id, callback){
  Users.findOneAndRemove({_id : id}, function(err, user){
    if (err){
      return callback({status : 500, message : 'Error : ' + err});
    }
    if (user){
      return callback(null);
    }
    return callback(null, {status : 404, message : 'Are you sure this user exist ?'});
  })
}

exports.authenticate = function(user, callback){

  Users.findOne({ email : user.email}, function(err,userAuth){
    if (err) {
      return callback(null, {status : 500, message : 'Error : ' + err});
    }
    if (!userAuth){
      return callback(null, {status : 404, message : 'Authentification Failed. User not found'});
    }
    else if (userAuth) {
      userAuth.verifyPassword(user.password, function(err, ok){
        if (err) {
          return callback(null, {status : 500, message : 'Database Error : ' + err});
        }
        if (!ok) {
          return callback(null, {status : 401, message : 'Authentification Failed. Bad password'});
        }

        var tknUser = {_id : userAuth._id, email : userAuth.email};

        var token = jwt.sign(tknUser, 'secrettoken', {
          expiresIn: 1440 // expires in 24 hours
        });

        return callback(token, null);

      });
    }
  });
}
