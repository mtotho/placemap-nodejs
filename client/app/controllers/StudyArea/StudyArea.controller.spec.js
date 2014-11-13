'use strict';

describe('Controller: StudyareaCtrl', function () {

  // load the controller's module
  beforeEach(module('placemapApp'));

  var StudyareaCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StudyareaCtrl = $controller('StudyareaCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
