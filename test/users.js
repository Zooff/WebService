
let app = require('../app.js');

let mongoose = require("mongoose");
let Users = require('../data/users.js');
let bcrypt = require('bcrypt');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

var token = '';


describe('Users', function() {


  before(function(done){
    var userToAdd = new Users({
        email: 'test@test.fr',
        password: 'password',
        firstname: 'test',
        lastname: 'test',
        registrationDate: new Date().toJSON().slice(0,10),
        biography: ''
    });
    userToAdd.save(function(err) {
        done();
    });
  });

  after(function(done){
       mongoose.connection.collections.users.drop();
       mongoose.connection.collections.identitycounters.drop();
       done();
     });


  it('should authenticate a SINGLE user on /authenticate POST', function(done){
    chai.request(app)
    .post('/api/authenticate')
    .send({
      email: 'test@test.fr',
      password: 'password',
    })
    .end(function(err, res){
      res.should.have.status(200);
      token = res.body.message;
      done();
    });
  });
  it('should list ALL users on /api/users GET', function(done){
    chai.request(app)
    .get('/api/users')
    .set('x-access-token', token)
    .end(function(err,res){
      res.should.have.status(200);
      done();
    });
  });
  it('should list a SINGLE user on /api/users/<id> GET', function(done){
    chai.request(app)
    .get('/api/users/0')
    .set('x-access-token', token)
    .end(function(err,res){
      res.should.have.status(200);
      done();
    });
  });
  it('should update a SINGLE user on /api/user/<id> PUT', function(done){
    chai.request(app)
    .put('/api/users/0')
    .set('x-access-token', token)
    .send({
      'firstname': 'newName',
      'lastname': 'newLastname',
      'biography': 'new biography'
    })
    .end(function(err,res){
      res.should.have.status(200);
      done();
    });
  });
  it('should delete a SINGLE user on /api/user/<id> DELETE', function(done){
    chai.request(app)
    .delete('/api/users/0')
    .set('x-access-token', token)
    .end(function(err,res){
      res.should.have.status(200);
      done();
    });
  });
});
