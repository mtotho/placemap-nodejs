'use strict';

angular.module('placemapApp')
  .controller('AdminSACtrl', function ($scope, $resource) {
    
  		var StudyArea = $resource('/api/studyareas');
  		var AuditType = $resource('/api/audit_types');


  		function init(){


  			AuditType.query(function(result){
  				$scope.question_sets=result;
  			});

  			StudyArea.query(function(results){
  				$scope.studyareas=results;
  				console.log(results);
  			})


  		}
  		init();

  });
