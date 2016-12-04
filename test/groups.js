let app = require('../app.js');

let mongoose = require("mongoose");
let Users = require('../data/users.js');
let Groups = require('../data/groups.js');
let bcrypt = require('bcrypt');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

var adminToken = '';
var userToken = '';
var user2Token = '';


describe('Groups', function() {


  before(function(done){
    var adminToAdd = new Users({
        email: 'testadmin@test.fr',
        password: 'password',
        firstname: 'test',
        lastname: 'test',
        registrationDate: new Date().toJSON().slice(0,10),
        biography: ''
    });
    adminToAdd.save(function(err) {
    });
    var userToAdd = new Users({
        email: 'test@test.fr',
        password: 'password',
        firstname: 'test',
        lastname: 'test',
        registrationDate: new Date().toJSON().slice(0,10),
        biography: ''
    });
    userToAdd.save(function(err) {
    });
    var userToAdd2 = new Users({
        email: 'test2@test.fr',
        password: 'password',
        firstname: 'test',
        lastname: 'test',
        registrationDate: new Date().toJSON().slice(0,10),
        biography: ''
    });
    userToAdd2.save(function(err) {
    });
    var groupToCreate = new Groups({
            name: 'testGroup',
            description: 'test',
            admin: 'testAdminId',
            members: ['testAdminId'],
            board: [{
                _id: 'idComment1',
                author: 'testMemberId',
                message: 'this is the first comment',
                date: new Date().toJSON().slice(0,10)
            }, {
                _id: 'idComment2',
                author: 'testAdminId',
                message: 'this is the second comment',
                date: new Date().toJSON().slice(0,10)
            }]
        });
        groupToCreate.save(function(err) {
            done();
        });
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
      userToken = res.body.message;
      done();
    });
  });
  it('should authenticate a SINGLE user on /authenticate POST', function(done){
    chai.request(app)
    .post('/api/authenticate')
    .send({
      email: 'testadmin@test.fr',
      password: 'password',
    })
    .end(function(err, res){
      res.should.have.status(200);
      admintoken = res.body.message;
      done();
    });
  });
  it('should authenticate a SINGLE user on /authenticate POST', function(done){
    chai.request(app)
    .post('/api/authenticate')
    .send({
      email: 'test2@test.fr',
      password: 'password',
    })
    .end(function(err, res){
      res.should.have.status(200);
      user2Token = res.body.message;
      done();
    });
  });
  it('should list ALL groups on /blobs GET', function () {
    chai.request(app)
    .get('/api/groups')
    .set('x-access-token', admintoken)
    .end(function(err,res){
      res.should.have.status(200);
      done();
    });
  });
  it('should list a SINGLE groups on /api/groups/<id> GET', function(){
    chai.request(app)
    .get('/api/groups/0')
    .set('x-access-token', admintoken)
    .end(function(err,res){
      res.should.have.status(200);
      done();
    });
  });
  it('user should join groups on /api/groups/join POST');
  it('should update a SINGLE groups on /api/groups/<id> PUT', function(){
    chai.request(app)
    .put('/api/groups/0')
    .set('x-access-token', adminToken)
    .send({
      'name': 'newName',
      'description': 'new biography'
    })
    .end(function(err,res){
      res.should.have.status(200);
      done();
    });
  });
  it('should delete a SINGLE groups on /api/groups/<id> DELETE', function(){
    chai.request(app)
    .delete('/api/groups/0')
    .set('x-access-token', adminToken)
    .end(function(err,res){
      res.should.have.status(200);
      done();
    });
  });


});
