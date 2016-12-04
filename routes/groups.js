var express = require('express');
var router = express.Router();
var dao = require('../data/groupsDao.js');
var jwt = require('jsonwebtoken');
var config = require


router.use(function(req, res, next){

	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (token){
		jwt.verify(token, 'secrettoken', function(err, decoded){
			if (err){
				res.status(500).json({success : false, message : 'Failed to decode the JSON token ' + err});
			}
			else {
				req.decoded = decoded;
				next();
			}
		});
	}
	else {
		return res.status(403).json({success : false, message : "No token provided"});
	}
})

router.get('/', function(req, res, next){
	dao.getAll(function(groups, err){
		if(err){
     	 	res.status(err.status).send(err.message);
    	} else {
      		res.status(200).json(groups);
    	}
	});
});

router.get('/:groupId', function(req, res, next){
	dao.get(req.params.groupId, function(group, err){
		if(err){
     	 	res.status(err.status).send(err.message);
    	} else {
      		res.status(200).json(group);
      	}
	});
});

router.delete('/:groupId', function(req, res){
	dao.delete(req.params.groupId, req.decoded._id, function(err){
		if(err){
     	 	res.status(err.status).send(err.message);
    	} else {
      		res.status(200).send("Group Delete");
      	}
	});
});

router.post('/createGroup', function(req, res){
    var newGroup = req.body;
    dao.create(newGroup, function(group, err){
        if(err){
            res.status(err.status).send(err.message);
        } else {
            res.status(200).send("New group created");
        }
    });
});

router.put('/:groupId', function(req, res){
    var newGr = req.body;
    dao.updateGr(req.params.groupId, newGr, req.decoded._id, function(group, err){
        if(err){
            res.status(err.status).send(err.message);
        } else {
            res.status(200).send("The group has been updated");
        }
    });
});

router.put('/:groupId/join', function(req, res){
		console.log(req.params.groupId, req.decoded._id);
    dao.joinGroup(req.params.groupId, req.decoded._id, function(group, err){
        if(err){
            res.status(err.status).send(err.message);
        } else {
            res.status(200).send("The user has been added in the group");
        }
    });
});

router.put('/:groupId/leave', function(req, res){
    dao.leaveGroup(req.params.groupId, req.decoded._id, function(group, err){
        if(err){
            res.status(err.status).send(err.message);
        } else {
            res.status(200).send("The user has been removed from the group");
        }
    });
});

router.get('/:groupId/comments', function(req, res){
	dao.getComments(req.params.groupId, function(comments, err){
		if (err){
			res.status(err.status).send(err.message);
		}
		res.status(200).json(comments);
	});
});

router.get('/:groupId/comments/:commentId', function(req, res){
	dao.getComment(req.params.groupId, req.params.commentId,  function(comment, err){
		if (err){
			res.status(err.status).send(err.message);
		}
		res.status(200).json(comment);
	});
});


router.post('/:groupId/addComment', function(req, res) {
	var comment = {user : req.decoded._id, value : req.body.value};
	dao.addComment(req.params.groupId, comment, function(comm, err){
		if (err){
			res.status(err.status).send(err.message);
		}
		res.status(200).send(comm);
	});
});

router.delete('/:groupId/comments/:idComment', function(req,res){
	dao.removeComment(req.params.groupId, req.params.idComment, function(com, err){
		if (err){
			res.status(err.status).send(err.message);
		}
		res.status(200).json(com);
	});
});

router.put('/:groupId/comments/:idComment', function(req,res){
	var comment = req.body;
	dao.updateComment(req.params.groupId, req.params.idComment, comment, function(com, err){
		if (err){
			res.status(err.status).send(err.message);
		}
		res.status(200).json(com);
	});
});

module.exports = router;
