import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';

var mongoose   = require('mongoose');
var User = require('../tools/models/user');
var Router = require('../tools/routes');

var app = express();
/* eslint-disable no-console */

var port = process.env.PORT || 3000;
const compiler = webpack(config);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var uristring = 
  process.env.MONGODB_URI || 
  'mongodb://localhost/HelloMongoose';

mongoose.connect(uristring, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

app.use('/api', Router);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
