'use strict';

angular.module('placemapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/controllers/admin/admin.html',
        controller: 'AdminCtrl'
      });
  });