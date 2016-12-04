var express = require('express');
var dao = require('../data/usersDao.js');
var router = express.Router();
var jwt = require('jsonwebtoken');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signup', function(req, res){
    res.sendfile('./public/views/signup.html');
});

router.post('/signup', function(req, res){
  var newUser = req.body;
  dao.addUser(newUser, function(user, err){
    if (err){
      res.status(err.status).send(err.message);
    }
    else {
      res.status(200).json(user);
    }
  })
});

router.post('/authenticate', function(req, res){
  var user = req.body;
  console.log(user);
  dao.authenticate(user, function(token, err){
    if (err){
      res.status(err.status).send(err.message);
    }
    else {
      res.status(200).json(token);
    }
  });
});

router.use(function(req, res, next){

	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (token){
		jwt.verify(token, 'secrettoken', function(err, decoded){
			if (err){
				res.status(500).json({success : false, message : 'Failed to decode the JSON token ' + err});
			}
			else {
				req.decoded = decoded;
				console.log(decoded);
				next();
			}
		});
	}
	else {
		return res.status(403).json({success : false, message : "No token provided"});
	}
})


router.get('/home', function(req, res) {
  res.sendfile('./public/views/home.html');
});

router.get('/groups/createGroup', function(req, res) {
  res.sendfile('./public/views/createGroup.html');
});

router.get('/groups/updateGroup', function(req, res) {
  res.sendfile('./public/views/updateGroup.html');
});

router.get('/groups/detail', function(req, res) {
  res.sendfile('./public/views/detailGroup.html');
});

router.get('/users/detail', function(req, res) {
  res.sendfile('./public/views/detailUser.html');
});

module.exports = router;
