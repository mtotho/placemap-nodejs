'use strict';

angular.module('placemapApp')
  .controller('AdminQuestionCtrl', function ($scope, $rootScope, $resource) {
    
  		var AuditType = $resource('api/audit_types');
  		$scope.question_sets = new Array();
      $scope.edit_mode = false;
      $scope.edit_question_id = -1;

  		function init(){

  			AuditType.query(function(result){
  				$scope.question_sets=result;
          console.log(result);
  			});
  			

        $('.collapse').collapse({
          toggle: false
        });
    
  		}
  		init();
      $scope.$watch('selQS', function(value){
    
        if(!angular.isUndefined(value)){
        //  console.log(value);
          loadQuestionSet(value);

        }
        
      });
      $scope.btnAddQuestion = function(){

        $("ng-questions-add .modal").modal('show');
      }
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

      function loadQuestionSet(value){
        var temp_questions = new Array();
        angular.copy(value.questions, temp_questions);
        //temp_questions =  value.questions;
        $scope.question_set = value;

        //$scope.question_set.questions = new Array();
        //$scope.question_set.order = new Array();
        
        //question_set.questions = new Array();

      //  for(var i=0; i<temp_questions.length; i++){
          //$scope.question_set.order[]
        //  $scope.question_set.questions[temp_questions[i].question_id]=temp_questions[i];
      //W  }
        //question_set.questions.length=i;
      //  console.log($scope.question_set);
        $('#adminQuestionPanel').collapse('show');
      }


  });
