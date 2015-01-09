'use strict';

angular.module('ipWatcherApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];


    $http.get('/api/ipWatchers').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;


      socket.syncUpdates('ipWatcher', $scope.awesomeThings, function(event, item, array) { });
    });

  });
