'use strict';

describe('Service: AuditType', function () {

  // load the service's module
  beforeEach(module('placemapApp'));

  // instantiate service
  var AuditType;
  beforeEach(inject(function (_AuditType_) {
    AuditType = _AuditType_;
  }));

  it('should do something', function () {
    expect(!!AuditType).toBe(true);
  });

});
