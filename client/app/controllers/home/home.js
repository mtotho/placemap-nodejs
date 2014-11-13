'use strict';

angular.module('placemapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/controllers/home/home.html',
        controller: 'HomeCtrl'
      });
  });