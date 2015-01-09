'use strict';

angular.module('ipWatcherApp')
  .filter('momentDate', function () {
    return function (input) {
      return moment.unix(input).utcOffset(-7*60).format('D/YYYY, HH:mm:ss')
    };
  });
