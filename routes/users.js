var express = require('express');
var router = express.Router();
var dao = require('../data/usersDao.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  dao.FindAll(function(users,err){
    if(err){
      res.status(err.status).send(err.message);
    }
    else {
      res.status(200).json(users);
    }
  })

});

router.post('/signup', function(req, res){
  res.send("something");
});

router.get('/:userId', function(req,res){
  dao.findById(req.param('userId'), function(user, err){
    if(err){
      res.status(err.status).send(err.message);
    }
    else {
      res.status(200).json(user);
    }
  })
});

router.put('/:userId', function(req, res){

});

router.delete('/:userId', function(req,res){

});




module.exports = router;
