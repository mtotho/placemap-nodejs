'use strict';

angular.module('placemapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/controllers/login/login.html',
        controller: 'LoginCtrl'
      });
  });