'use strict';

angular.module('placemapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('SASelect', {
        url: '/studyarea',
        templateUrl: 'app/controllers/SASelect/SASelect.html',
        controller: 'SaselectCtrl',
        data:{
          authenticate:false
       	}
      });
  });