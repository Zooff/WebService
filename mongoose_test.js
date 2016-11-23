'use strict';

var mongoose = require('mongoose');
var dao = require('./data/usersDao.js');
var group = require('./data/groups.js');

mongoose.connect('mongodb://localhost/test');


var db = mongoose.connection;
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(db);

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
  //console.log('zooff');
  //
  //var julio42 = new Users({email : 'julio42@gamil.com', firstname : 'julio', lastname : 'sunblade', biography : 'I add you man'});
  //
  // zooff.save(function(err,zooff){
  //   if (err) return console.log(err);
  //   console.log(zooff);
  // });
  //
  //julio42.save();

  var gr1 = new group({name : 'toto', description : 'titi', admin : 'julio', members : 'zooff', board : 'my board'});
  gr1.save();

  //console.log(dao.FindAll());

});
