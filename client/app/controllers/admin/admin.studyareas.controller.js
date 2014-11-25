'use strict';

angular.module('placemapApp')
  .controller('AdminSACtrl', function ($scope,API) {
    
  	//var StudyArea = $resource('/api/studyareas');
  	//	var AuditType = $resource('api/audit_types');


  		function init(){


  			API.AuditType.query(function(result){
  				$scope.question_sets=result;
  			});

  		  API.Studyarea.query(function(results){
  				$scope.studyareas=results;
  				console.log(results);
  			})


  		}
  		init();


      $scope.$watch('studyareas',function(value){

       // console.log(value)
      })
  });

angular.module('placemapApp')
  .controller('AdminSAWatchCtrl', function ($scope,API) {
    
    //var rStudyArea = $resource('/api/studyareas');
      //var AuditType = $resource('api/audit_types');


      function init(){

      //  AuditType.query(function(result){
      //    $scope.question_sets=result;
     //   });

     //   Studyarea.query(function(results){
     //     $scope.studyareas=results;
        //  console.log(results);
      //  })


      }
      init();

      $scope.audit_type_update = function(){
        //Make sure new value is defined 
        if(!angular.isUndefined($scope.sa.default_audit_type) && $scope.sa.default_audit_type!=null){
            updateStudyarea();
        }
      }

      $scope.radio_update = function(){
          updateStudyarea();
      }

      function updateStudyarea(){
        console.log("===UPDATE STUDY AREA====");
        console.log($scope.sa);
        API.Studyarea.update($scope.sa, function(result){
          console.log(result);
        });
      }
  });
