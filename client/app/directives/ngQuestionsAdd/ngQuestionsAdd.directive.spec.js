'use strict';

describe('Directive: ngQuestionsAdd', function () {

  // load the directive's module and view
  beforeEach(module('placemapApp'));
  beforeEach(module('app/directives/ngQuestionsAdd/ngQuestionsAdd.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ng-questions-add></ng-questions-add>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the ngQuestionsAdd directive');
  }));
});