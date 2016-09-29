var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ParkingSchema = new Schema({
  lotname: Number,
  accessible: Boolean,
  building: Number,
  lat: String,
  long: String,
  occupied: String
});

module.exports = mongoose.model('Parking', ParkingSchema);
