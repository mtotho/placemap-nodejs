'use strict';

angular.module('placemapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('StudyareaData', {
        url: '/studyarea/:studyarea_id/data',
        templateUrl: 'app/controllers/StudyareaData/StudyareaData.html',
        controller: 'StudyareadataCtrl',
      	data:{
          authenticate:false
       	}
      });
  });