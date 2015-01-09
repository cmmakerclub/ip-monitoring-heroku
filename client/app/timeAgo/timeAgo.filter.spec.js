'use strict';

describe('Filter: timeAgo', function () {

  // load the filter's module
  beforeEach(module('ipWarcherApp'));

  // initialize a new instance of the filter before each test
  var timeAgo;
  beforeEach(inject(function ($filter) {
    timeAgo = $filter('timeAgo');
  }));

  it('should return the input prefixed with "timeAgo filter:"', function () {
    var text = 'angularjs';
    expect(timeAgo(text)).toBe('timeAgo filter: ' + text);
  });

});
