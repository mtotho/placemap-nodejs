'use strict';

describe('Controller: StudyareadataCtrl', function () {

  // load the controller's module
  beforeEach(module('placemapApp'));

  var StudyareadataCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StudyareadataCtrl = $controller('StudyareadataCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
