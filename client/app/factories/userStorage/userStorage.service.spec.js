'use strict';

describe('Service: userStorage', function () {

  // load the service's module
  beforeEach(module('placemapApp'));

  // instantiate service
  var userStorage;
  beforeEach(inject(function (_userStorage_) {
    userStorage = _userStorage_;
  }));

  it('should do something', function () {
    expect(!!userStorage).toBe(true);
  });

});
