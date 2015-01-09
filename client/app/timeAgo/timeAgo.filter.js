'use strict';

angular.module('ipWatcherApp')
  .filter('timeAgo', function () {
    return function (input) {
        return moment(input).fromNow();
    };
  });
