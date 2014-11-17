'use strict';

angular.module('placemapApp')
  .directive('ngQuestionsAdd', function (AuditType) {
    return {
      templateUrl: 'app/directives/ngQuestionsAdd/ngQuestionsAdd.html',
      restrict: 'EA',
      scope:{
    	question_set: '=qs',
        edit_mode: '=edit',
        eid: '='
      },
      link: function (scope, element, attrs) {
      	 $('ng-questions-add .modal').on('hidden.bs.modal', function (e) {
            if(scope.edit_mode){
                scope.edit_mode=false;
            }
            scope.tempQuestion = new Object();
            $('ng-questions-add .collapse').collapse('hide');
            scope.$apply();

            // do something...
        });
      },
      controller: function($scope, $resource){
  	
      	function init(){
      	
    		$scope.types={
	    		shortanswer:false,
	    		radio:false,
	    		likert:false,
                check:false
			}
	    	$scope.tempQuestion = new Object();
    		
    		$('ng-questions-add .collapse').collapse({
			  toggle: false
			});

			$('ng-questions-add .modal').modal({
			  show: false
			});
    	}
    	init();

    	$scope.btnAddRdoOption = function(){

    		if(angular.isUndefined($scope.tempQuestion.opts)){
    			$scope.tempQuestion.opts = new Array();
    		}
    		if($scope.newRdoOption!=""){
	    		
	    		var radioOrCheck = {
	    			"option_text":$scope.newRdoOption,
	    			"order":$scope.tempQuestion.opts.length + 1
	    		}
	    		$scope.newRdoOption="";
	    		$scope.tempQuestion.opts.push(radioOrCheck);
	    	
    		}else{
    			alert("Must enter a name for the radio option");
    		}
    	}

        $scope.btnUpdate = function(){
            var tempQuestion = $scope.tempQuestion;
            
            api.updateQuestion({"question":tempQuestion}).then(function(response){
              

              $scope.question_set.questions[response.question.question_id]=response.question;
              console.log(response);
              $("ng-questions-add .modal").modal('hide');
            });

        }

    	//Submit question to db
    	$scope.btnSubmit = function(){
			//var AuditType = $resource('/api/audit_types/'+$scope.question_set._id);
			var Question = $resource('/api/questions');

    		var tempQuestion = $scope.tempQuestion;

    		var q = new Question();

    		q.question_text=$scope.tempQuestion.question_text;
    		q.question_type=$scope.tempQuestion.question_type;
    		q.is_deleted   =false;
    		q.order 	   =countProperties($scope.question_set.questions) + 1;

    		q.opts = $scope.tempQuestion.opts;

    		q.$save(function(result){

    			var newQ = {
					"order":$scope.question_set.questions.length+1,
					"question":result
				};

				$scope.question_set.questions.push(newQ);

				AuditType.update($scope.question_set, function(result){
					console.log(result);
				});

				console.log($scope.question_set);

    		});
			
			$("ng-questions-add .modal").modal('hide');
			
			//$scope.tempQuestion = null;
    	}
        $scope.$watch('edit_mode', function(value){
            if(value){

                angular.copy($scope.question_set.questions[$scope.eid], $scope.tempQuestion)
                //$scope.tempQuestion = $scope.question_set.questions[$scope.eid];
                $scope.selQT = $scope.tempQuestion.question_type;

                if($scope.tempQuestion.jsonOpts == null){
                    $scope.tempQuestion.opts = new Array();
                }else{
                    $scope.tempQuestion.opts=$scope.tempQuestion.jsonOpts;
                }
                

                console.log($scope.tempQuestion);
               //$scope.tempQuestion = 

           }
        });
        $scope.removeOpt = function(index){
            $scope.tempQuestion.opts.splice(index,1);
        }
    	$scope.$watch('tempQuestion.question_type',function(){
    		
    		//hide all of the types
    		for(var type in $scope.types){
    			$scope.types[type]=false;
    		}

    		//enable the type that is selected
    		if(!angular.isUndefined($scope.tempQuestion.question_type)){
	    		$scope.types[$scope.tempQuestion.question_type]=true;

	    		$('ng-questions-add .collapse').collapse('show');
	    	}
    	});



    	function countProperties(obj) {
    		return Object.keys(obj).length;
		}
	}//end controller
    };
  });