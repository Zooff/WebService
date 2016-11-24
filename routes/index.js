var express = require('express');
var dao = require('../data/usersDao.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signup', function(req, res){
    res.sendfile('./public/views/signup.html');
});

router.post('/authenticate', function(req, res){
  var user = req.body;
  console.log(user);
  dao.authenticate(user, function(user, err){
    if (err){
      res.status(err.status).send(err.message);
    }
    else {
      res.status(200).send("Good");
    }
  })
})

module.exports = router;
