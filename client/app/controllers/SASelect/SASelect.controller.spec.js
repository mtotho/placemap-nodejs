'use strict';

describe('Controller: SaselectCtrl', function () {

  // load the controller's module
  beforeEach(module('placemapApp'));

  var SaselectCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SaselectCtrl = $controller('SaselectCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
