'use strict';

angular.module('placemapApp')
  .controller('AdminQuestionCtrl', function ($scope, $resource) {
    
  		var AuditType = $resource('/api/audit_types');
  		$scope.question_sets = new Array();

  		function init(){

  			AuditType.query(function(result){
  				$scope.question_sets=result;
  			});
  			

  		}
  		init();

  		$scope.createQuestionSet=function(form){
	      	if(form.$valid) {

	      		var qs = new AuditType();
	      		qs.name=$scope.newQS;

	      		qs.$save(function(result){
	      			$scope.question_sets.push(result);
	      			$scope.newQS="";
	      		});
	      	}//end if form valid
  		}//end createQuestionSet(form)



  });
