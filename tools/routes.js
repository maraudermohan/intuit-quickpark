var express = require('express');
var User = require('../tools/models/user');

var router = express.Router();
router.use(function (req, res, next) {
  console.log('Calling the api');
  next();
});

router.get('/', function (req, res) {
  res.json({message: 'Yaay, apis are accessible!'});
});

router.route('/user')
  .post(function (req, res) {
    User.findOne({username: req.body.username}, function (err, user) {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  });
router.route('/user/park')
  .post(function (req, res) {
    User.findOneAndUpdate({username: req.body.username}, {parkedSpot : req.body.parkedSpot }, function (err, user) {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  });
router.route('/user/free')
  .post(function (req, res) {
    User.findOneAndUpdate({username: req.body.username}, {parkedSpot : 0 },  function (err, user) {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  });

router.route('/user/create')
  .post(function (req, res) {
    var user = new User();
    user.username = req.body.username;
    user.isAccessible = req.body.isAccessible || false;
    user.parkedSpot = req.body.parkedSpot || 0;

    // save the user
    user.save(function (err) {
      if (err) {
        res.send(err);
      }

      res.json({message: 'User created.'});
    });
  });

  router.route('/user/all')
  .post(function (req, res) {
    User.find(function (err, user) {
      if (err) {
        res.send(err);
      }
      res.json(user);
    }
    );
  });

  router.route('/user/remove')
  .post(function (req, res) {
    User.remove({username: req.body.username}, function (err, user) {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  });

  router.route('/user/removeall')
  .post(function (req, res) {
    User.remove(function (err, user) {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  });


module.exports = router;
