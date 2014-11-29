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
      controller:function($scope, API, GMap){
  		
        $scope.qindex = 0;
        $scope.curQuestion;
        $scope.progress=0;
        $scope.completion=false;
        $scope.qcount;
        $scope.responses = new Array();

        

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
           //var Response = $resource('api/responses');
            var r = new API.Response();
            r.lat= $scope.marker.coords.latitude;
            r.lng= $scope.marker.coords.longitude;
            r.icon=$scope.marker.icon;
            r.audit_type = $scope.study_area.default_audit_type._id;
            r.responses = new Array();
            r.address=new Object();
            r.study_area=$scope.study_area._id;
            console.log($scope.responses);

            for(var i=0; i<$scope.responses.length; i++){
                
                var tempR = new Object();
                tempR.text = $scope.responses[i].text;
                tempR.opts =  $scope.responses[i].opts;
                tempR.question= $scope.responses[i].question;

               //for(var key in $scope.responses[i].opts){
                   // tempR.opts[key]=true;
              //  }


                r.responses.push(tempR);
            }



            var gc = new google.maps.Geocoder();

            gc.geocode({"location":new google.maps.LatLng(r.lat,r.lng)}, function(result){
                r.address.address_components=result[0].address_components;
                r.address.formatted_address=result[0].formatted_address;

                if(window.debug)console.log("===Marker Post==="); 
                if(window.debug)console.log(r);
                if(window.debug)console.log(" ");


                r.$save(function(result){
                    console.log(result);
                 

                    var m ={
                            latitude: result.lat,
                            longitude: result.lng,
                            id:result._id,
                            title:'derp',
                            icon:GMap.icons[result.icon],
                            iconColor:result.icon,
                            responses:result.responses
                    }
                     $scope.study_area.responseMarkers.push(m);
                  
                    $scope.qvopen=false;
                    $scope.responses=new Object();
                   // $scope.newQS="";
                });
            //post marker to database
            });
            

          

         
            //api.postMarker(data).then(function(response){
               
              
             //   gmap.loadMarker(response.marker);
                
                //hide the qv modal
               // $
              //   $scope.responses = new Object();
            
           // });

         
        }
        function setQuestion(qindex){
         
            $scope.progress = (qindex) / $scope.study_area.default_audit_type.questions.length;
            $("ng-questions-view .progress-bar").css('width', $scope.progress*100 + "%" );
          
            $scope.curQuestion = $scope.study_area.default_audit_type.questions[qindex].question;
            
           if(angular.isUndefined($scope.responses[qindex])){
                $scope.responses[qindex] = new Array();
                $scope.responses[qindex].opts = new Object();
           } 
       

            $scope.responses[qindex].question=$scope.curQuestion._id;
          

          //  $scope.responses[qindex].question_type =$scope.curQuestion.question_type;

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