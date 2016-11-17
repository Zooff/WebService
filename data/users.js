'use strict';

var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var usersSchema = new mongoose.Schema({
  email : String,
  firstname : String,
  lastname : String,
  biography : String,
  registration : Date,

});

usersSchema.plugin(autoIncrement.plugin, 'Users');
var Users = mongoose.model('Users', usersSchema);



module.exports = Users;
