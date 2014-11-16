'use strict';

describe('Service: GMap', function () {

  // load the service's module
  beforeEach(module('placemapApp'));

  // instantiate service
  var GMap;
  beforeEach(inject(function (_GMap_) {
    GMap = _GMap_;
  }));

  it('should do something', function () {
    expect(!!GMap).toBe(true);
  });

});
