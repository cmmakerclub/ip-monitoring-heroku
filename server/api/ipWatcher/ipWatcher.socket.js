/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var IpWatcher = require('./ipWatcher.model');
var config = require('../../config/environment');
var Cylon = require('cylon');
var _ = require("lodash");
var Q = require('q');

var mqtt_server = config.mqtt.ip;
var leases_parser = require('dhcp.leases.parser');

IpWatcher.find({}).remove(function() {});

// CALL BACKS
var updated_save_callback = function (err) {
  if (err) {
    console.log('save error')
    console.log(err)
  } else {
    console.log('update successfully.')
  }
};

var ip_save_callback =  function(err, ipWatcher) {
  if (err) {
    console.log('save error')
    console.log(err)
  } else {
    console.log('save successfully.')
  }
}


leases_parser.setCallback(function(v) {
    var i;
    for (i = 0; i < v.length; i++) {
      var ipData = {};

      ipData.leases_time = v[i][0];
      ipData.mac_address = v[i][1];
      ipData.ip = v[i][2];
      ipData.name = v[i][3];
      ipData.updated_at = new Date();
      if (!!!ipData.name) continue;

      var f = function(ipObj) {
        var find_one_callback = function (err, ipWatcher) {
          var updated;
          if(ipWatcher) {
            updated = _.merge(ipWatcher, ipObj);
            updated.save(updated_save_callback);
          } 
          else {
            var f = function(ipObj) {
              return ip_save_callback;
            };
            IpWatcher.create(ipObj, f());
          }
        }
        return find_one_callback; 
      }

      !function(objIn) {
        var ipObj = _.clone(objIn);
        IpWatcher.findOne({ mac_address: ipObj.mac_address}, f(ipObj));
      }(ipData);
    }
});


startMqttServer();

exports.register = function(socket) {
  IpWatcher.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  IpWatcher.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('ipWatcher:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('ipWatcher:remove', doc);
}

function startMqttServer() {

  Cylon.robot({
    connections: {
      server: { adaptor: 'mqtt', host: mqtt_server }
    },

    devices: {},

    work: function(my) {
      my.server.subscribe('cmmc-ip');
      my.server.on('message', function (topic, data) {
        console.log("on messae");
        leases_parser.parse(data);
      });
    }
  });

  Cylon.start();
}
