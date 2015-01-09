'use strict';

var _ = require('lodash');
var IpWatcher = require('./ipWatcher.model');

// Get list of ipWatchers
exports.index = function(req, res) {
  IpWatcher.find({}).select('ip name leases_time updated_at ').exec(function (err, ipWatchers) {
    if(err) { return handleError(res, err); }
    return res.json(200, ipWatchers);
  });
};

// Get a single ipWatcher
exports.show = function(req, res) {

  return res.send(404);

  IpWatcher.findById(req.params.id, function (err, ipWatcher) {
    if(err) { return handleError(res, err); }
    if(!ipWatcher) { return res.send(404); }
    return res.json(ipWatcher);
  });
};

// Creates a new ipWatcher in the DB.
exports.create = function(req, res) {

  return res.send(404);

  IpWatcher.create(req.body, function(err, ipWatcher) {
    if(err) { return handleError(res, err); }
    return res.json(201, ipWatcher);
  });
};

// Updates an existing ipWatcher in the DB.
exports.update = function(req, res) {

  return res.send(404);

  if(req.body._id) { delete req.body._id; }
  IpWatcher.findById(req.params.id, function (err, ipWatcher) {
    if (err) { return handleError(res, err); }
    if(!ipWatcher) { return res.send(404); }
    var updated = _.merge(ipWatcher, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, ipWatcher);
    });
  });
};

// Deletes a ipWatcher from the DB.
exports.destroy = function(req, res) {

  return res.send(404);

  IpWatcher.findById(req.params.id, function (err, ipWatcher) {
    if(err) { return handleError(res, err); }
    if(!ipWatcher) { return res.send(404); }
    ipWatcher.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}