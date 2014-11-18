'use strict';

describe('Service: Studyarea', function () {

  // load the service's module
  beforeEach(module('placemapApp'));

  // instantiate service
  var Studyarea;
  beforeEach(inject(function (_Studyarea_) {
    Studyarea = _Studyarea_;
  }));

  it('should do something', function () {
    expect(!!Studyarea).toBe(true);
  });

});
