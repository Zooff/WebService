'use strict';

var mongoose = require('mongoose');
var dao = require('./data/usersDao.js');

mongoose.connect('mongodb://localhost/test');


var db = mongoose.connection;
db.on('error', console.error.bind(console, "Connection Error"));
db.once('open', function() {

  // var usersSchema = new mongoose.Schema({
  //   email : String,
  //   firstname : String,
  //   lastname : String,
  //   biography : String,
  //   registration : Date,
  //
  // });
  // var Users = mongoose.model('Users', usersSchema);

  // var zooff = new Users({ email : 'zooff@gmail.com', firstname : 'zooff', lastname : 'moonblade', biography : 'Just a little test'});
  console.log('zooff');
  //
  // var julio42 = new Users({email : 'julio42@gamil.com', firstname : 'julio', lastname : 'sunblade', biography : 'I add you man'});
  //
  // zooff.save(function(err,zooff){
  //   if (err) return console.log(err);
  //   console.log(zooff);
  // });
  //
  // julio42.save();

  console.log(dao.FindAll());

});
