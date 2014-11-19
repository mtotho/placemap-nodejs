'use strict';

describe('Service: StudyAreaMap', function () {

  // load the service's module
  beforeEach(module('placemapApp'));

  // instantiate service
  var StudyAreaMap;
  beforeEach(inject(function (_StudyAreaMap_) {
    StudyAreaMap = _StudyAreaMap_;
  }));

  it('should do something', function () {
    expect(!!StudyAreaMap).toBe(true);
  });

});
