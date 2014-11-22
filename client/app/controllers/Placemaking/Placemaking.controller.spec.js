'use strict';

describe('Controller: PlacemakingCtrl', function () {

  // load the controller's module
  beforeEach(module('placemapApp'));

  var PlacemakingCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PlacemakingCtrl = $controller('PlacemakingCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
