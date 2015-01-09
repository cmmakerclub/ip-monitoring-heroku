'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var IpWatcherSchema = new Schema({
  leases_time: String,
  ip: String,
  name: String,
  mac_address: String,
  updated_at: Date
});

module.exports = mongoose.model('IpWatcher', IpWatcherSchema);