'use strict';

describe('Filter: momentDate', function () {

  // load the filter's module
  beforeEach(module('ipWarcherApp'));

  // initialize a new instance of the filter before each test
  var momentDate;
  beforeEach(inject(function ($filter) {
    momentDate = $filter('momentDate');
  }));

  it('should return the input prefixed with "momentDate filter:"', function () {
    var text = 'angularjs';
    expect(momentDate(text)).toBe('momentDate filter: ' + text);
  });

});
