var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  isAccessible: Boolean,
  parkedSpot: Number
});

module.exports = mongoose.model('User', UserSchema);
