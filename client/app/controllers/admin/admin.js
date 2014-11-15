'use strict';

angular.module('placemapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
		templateUrl: 'app/controllers/admin/admin.html',
	  	controller: 'AdminCtrl'
      
      }).state('admin.studyareas',{
      	url:'/studyareas',
      	templateUrl: 'app/controllers/admin/admin.studyareas.html',
      	controller:'AdminSACtrl'

      }).state('admin.users',{
      	url:'/users',
      	templateUrl: 'app/controllers/admin/admin.users.html',
      	controller:'AdminUserCtrl'

      }).state('admin.questions',{
      	url:'/questions',
      	templateUrl: 'app/controllers/admin/admin.questions.html',
      	controller:'AdminQuestionCtrl'
      });
  });