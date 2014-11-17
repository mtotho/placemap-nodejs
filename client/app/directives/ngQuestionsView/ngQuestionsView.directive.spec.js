'use strict';

describe('Directive: ngQuestionsView', function () {

  // load the directive's module and view
  beforeEach(module('placemapApp'));
  beforeEach(module('app/directives/ngQuestionsView/ngQuestionsView.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ng-questions-view></ng-questions-view>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the ngQuestionsView directive');
  }));
});