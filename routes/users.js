var express = require('express');
var router = express.Router();
var dao = require('../data/usersDao.js');
var jwt = require('jsonwebtoken');



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

router.get('/:userId', function(req,res){
  dao.findById(req.params.userId, function(user, err){
    if(err){
      res.status(err.status).send(err.message);
    }
    else {
      res.status(200).json(user);
    }
  })
});

router.put('/:userId', function(req, res){
	if (req.decoded._id == req.params.userId){
	  var modifiedUser = {firstname : req.params.firstname, lastname : req.params.lastname, biography : req.params.biography};
	  dao.update(req.params.userId, modifiedUser, function(group, err){
	      if(err){
	          res.status(err.status).send(err.message);
	      } else {
	          res.status(200).send("The User has been changed");
	      }
  	});
	}
	else {
		res.status(403).send({success : false, message : 'You cant modify an other users'});
	}
});

router.delete('/:userId', function(req,res){
  if (req.decoded._id == req.params.userId){
    dao.removeUser(req.params.userId, function(err){
      if (err){
        res.status(err.status).send(err.message);
      }
      else {
        res.status(200).send("The user has been killed");
      }
    });
  }
  else {
    res.status(403).send({success : false, message : 'Action Forbidden'});
  }
});




module.exports = router;
