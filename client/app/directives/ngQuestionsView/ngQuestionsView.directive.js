'use strict';

angular.module('placemapApp')
  .directive('ngQuestionsView', function () {
    return {
      templateUrl: 'app/directives/ngQuestionsView/ngQuestionsView.html',
      restrict: 'EA',
      scope:{
      	study_area: '=sa',
        qvopen:'=',
        marker:'=mmarker'
      },
      link: function (scope, element, attrs) {
      	 $('ng-questions-view .modal').on('hidden.bs.modal', function (e) {
            if(window.debug)console.log("--Question View: Hidden");
            scope.$apply(function(){
                  scope.qvopen=false;
                    scope.qindex=0;
                    scope.completion=false;
                    scope.progress=0;
                  //  scope.responses=  new Object();
            });
          
        
            // do something...
        })
      },
      controller:function($scope){
  		
        $scope.qindex = 0;
        $scope.curQuestion;
        $scope.progress=0;
        $scope.completion=false;
        $scope.qcount;
        $scope.responses = new Object();

    	function init(){

            $("ng-questions-view .qback").addClass("disabled");
    		$scope.types={
	    		shortanswer:false,
	    		radio:false,
	    		likert:false,
                check:false
			}
	    	$scope.tempQuestion = new Object();
    		
    		

            $('ng-questions-view .modal').modal({
              show: false
            });

    	}
    	init();

        $scope.$watch('qindex', function(qindex){
            if(!angular.isUndefined($scope.study_area)){
                //console.log(qindex);
                //console.log($scope.qcount);
                if(qindex==0){
                    $("ng-questions-view .qback").addClass("disabled");
                }
                if(qindex>0){
                    $("ng-questions-view .qback").removeClass("disabled");
                }
                if(qindex>=$scope.qcount){
                     $("ng-questions-view .qnext").addClass("disabled");
                }
                if(qindex<$scope.qcount){

                    setQuestion(qindex);
                    $("ng-questions-view .qnext").removeClass("disabled");
                }

                


            }


        });
        $scope.$watch('qvopen', function(enabled){
            if(enabled){
                 $('ng-questions-view .modal').modal('show');
            }else{
                $('ng-questions-view .modal').modal('hide');
            }
        });

        $scope.$watch('study_area',function(study_area){
            if(!angular.isUndefined(study_area)){
            	$scope.qcount=study_area.default_audit_type.questions.length;
                if($scope.qcount>0){
                	  setQuestion($scope.qindex);
                }
              
               
            }
          
        });

        $
        $scope.btnNext = function(){
            if($scope.qindex < $scope.study_area.default_audit_type.questions.length-1){


                switch($scope.curQuestion.question_type){
                    case "shortanswer":{
                        //$scope.responses[$scope.curQuestion.question_id]=$scope.txtResponse;
                            break;
                    }
                    case "check":{

                            break;
                    }
                }
                


                $scope.qindex++;
                //setQuestion($scope.qindex);
            }else{
                $scope.qindex++;
                $scope.progress=1;
                $("ng-questions-view .progress-bar").css('width', $scope.progress*100 + "%" );
                $scope.completion=true;
                $scope.curQuestion=null;
            }


        }
        $scope.btnBack = function(){
            if($scope.qindex>0){
                $scope.qindex--;
                //setQuestion($scope.qindex);
                $scope.completion=false;
            }
        }
        $scope.btnSubmit = function(){
           

            var data = {
                "response":{
                    "question_set":{
                        "id":$scope.study_area.default_audit_type._id
                    } ,
                    "study_area_id": $scope.study_area.id,
                    "responses":$scope.responses,
                    "marker":$scope.marker
                }
            }

            if(window.debug)console.log("===Marker Post===");
            if(window.debug)console.log(data);
            if(window.debug)console.log(" ");

            //post marker to database
            api.postMarker(data).then(function(response){
                
                if(window.debug)console.log("===Marker Post - Response===");
                if(window.debug)console.log(response);
                if(window.debug)console.log(" ");

              
                gmap.loadMarker(response.marker);
                
                //hide the qv modal
                $scope.qvopen=false;
                 $scope.responses = new Object();
            
            });

         
        }
        function setQuestion(qindex){
         
            $scope.progress = (qindex) / $scope.study_area.default_audit_type.questions.length;
            $("ng-questions-view .progress-bar").css('width', $scope.progress*100 + "%" );
          
            $scope.curQuestion = $scope.study_area.default_audit_type.questions[qindex].question;
            
           if(angular.isUndefined($scope.responses[$scope.curQuestion._id])){
                $scope.responses[$scope.curQuestion._id] = new Object();
                $scope.responses[$scope.curQuestion._id].opts = new Object();
           } 
            

            $scope.responses[$scope.curQuestion._id]._id=$scope.curQuestion.question_id;
            $scope.responses[$scope.curQuestion._id].question_type =$scope.curQuestion.question_type;

            if(window.debug)console.log("=== Current Question===");
            if(window.debug)console.log($scope.curQuestion);
            if(window.debug)console.log(" ");
        }

        $scope.btnMdlCancel = function(){
           // $scope.qvopen=false;
        }

    	function countProperties(obj) {
    		return Object.keys(obj).length;
		}
    }
};
});