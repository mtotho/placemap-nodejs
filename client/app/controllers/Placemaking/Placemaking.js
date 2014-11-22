'use strict';

angular.module('placemapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('Placemaking', {
        url: '/placemaking',
        templateUrl: 'app/controllers/Placemaking/Placemaking.html',
        controller: 'PlacemakingCtrl',
        data:{
          authenticate:false
       	}
      });
  });