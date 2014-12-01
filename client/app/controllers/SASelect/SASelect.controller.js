'use strict';

angular.module('placemapApp')
  .controller('SaselectCtrl', function ($scope, API, $location) {
    
  	//	var StudyArea = $resource('/api/studyareas');

  		function init(){
        
  			API.Studyarea.query({"is_public":true},function(results){
  				$scope.studyareas=results;
  				console.log(results);
  			});

  		
      }
  		init();

  		$scope.tileClick = function(sa_id){

     //  $state.go("Studyarea.map", {studyarea_id: sa_id})''
  			$location.path("studyarea/" + sa_id);

  		}

  });
