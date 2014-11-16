'use strict';

angular.module('placemapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('StudyArea', {
        url: '/studyarea/:studyarea_id',
        templateUrl: 'app/controllers/StudyArea/StudyArea.html',
        controller: 'StudyareaCtrl',
        data:{
          authenticate:false
       	}
      });
  });