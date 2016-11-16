var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('J\'avais raison');
});

router.post('/signup', function(req, res){
  res.send("something");
});

router.get('/:userId', function(req,res){
  res.send(req.param('userId'));
})

router.put('/:userId', function(req, res){

});

router.delete('/:userId', function(req,res){

});




module.exports = router;
