'use strict';

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');


var db = mongoose.connection;
db.on('error', console.error.bind(console, "Connection Error"));
db.once('open', function() {

  var usersSchema = new mongoose.Schema({
    email : String,
    firstname : String,
    lastname : String,
    biography : String,
    registration : Date,

  });
  var Users = mongoose.model('Users', usersSchema);

  var zooff = new Users({ email : 'zooff@gmail.com', firstname : 'zooff', lastname : 'moonblade', biography : 'Just a little test'});
  console.log(zooff);

  zooff.save(function(err,zooff){
    if (err) return console.log(err);
    console.log(zooff);
  });

  Users.find(function(err, users) {
    if (err) return console.log(err);
    console.log(users);
  });

});

db.close(function () {
  console.log("Connection close");
});
