var express = require('express');
var User = require('../tools/models/user');
var Parking = require('../tools/models/parking');

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
    User.findOneAndUpdate({username: req.body.username}, {$set:{parkedSpot : req.body.parkedSpot }}, function (err, user) {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  });
router.route('/user/free')
  .post(function (req, res) {
    User.findOneAndUpdate({username: req.body.username}, {$set:{parkedSpot : 0 }},  function (err, user) {
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
  router.route('/parking')
  .post(function (req, res) {
    Parking.findOne({lotname: req.body.lotname}, function (err, parking) {
      if (err) {
        res.send(err);
      }
      res.json(parking);
    });
  });
  router.route('/parking/distinctbuildings')
  .post(function (req, res) {
    Parking.distinct('building', function (err, parking) {
      if (err) {
        res.send(err);
      }
      res.json(parking);
    });
  });
  router.route('/parking/building')
  .post(function (req, res) {
    Parking.find({building: req.body.building, accessible: req.body.accessible}, function (err, parking) {
      if (err) {
        res.send(err);
      }
      res.json(parking);
    });
  });
  router.route('/parking/allfreespots')
  .post(function (req, res) {
    Parking.find({occupied: null , accessible: req.body.accessible}, function (err, parking) {
      if (err) {
        res.send(err);
      }
      res.json(parking);
    });
  });
router.route('/parking/park')
  .post(function (req, res) {
    Parking.findOneAndUpdate({lotname: req.body.lotname}, {$set:{occupied : req.body.occupied }},  function (err, user) {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  });
  router.route('/parking/free')
  .post(function (req, res) {
    Parking.findOneAndUpdate({lotname: req.body.lotname}, {$set:{occupied : null }}, function (err, user) {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  });
  router.route('/parking/getspot')
  .post(function (req, res) {
    Parking.findOne({lotname: req.body.lotname}, function (err, user) {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  });
router.route('/parking/create')
  .post(function (req, res) {
    var parking = new Parking();
    parking.lotname = req.body.lotname;
    parking.building = req.body.building || 1;
    parking.accessible = req.body.accessible || false;
    parking.lat = req.body.lat || "37.4276422";
    parking.long = req.body.long || "-122.1093268";
    parking.occupied = req.body.occupied || null;

    // save the user
    parking.save(function (err) {
      if (err) {
        res.send(err);
      }

      res.json({message: 'parking lot created.'});
    });
  });

  router.route('/parking/all')
  .post(function (req, res) {
    Parking.find(function (err, parking) {
      if (err) {
        res.send(err);
      }
      res.json(parking);
    }
    );
  });

  router.route('/parking/remove')
  .post(function (req, res) {
    Parking.remove({lotname: req.body.lotname}, function (err, parking) {
      if (err) {
        res.send(err);
      }
      res.json(parking);
    });
  });

  router.route('/parking/removeall')
  .post(function (req, res) {
    Parking.remove(function (err, parking) {
      if (err) {
        res.send(err);
      }
      res.json(parking);
    });
  });


module.exports = router;
