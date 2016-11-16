'use strict';

var mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
  email : String,
  firstname : String,
  lastname : String,
  biography : String,
  registration : Date,

});
var Users = mongoose.model('Users', usersSchema);

module.exports = Users;
