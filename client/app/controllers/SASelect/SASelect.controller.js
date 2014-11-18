'use strict';

angular.module('placemapApp')
  .controller('SaselectCtrl', function ($scope, $resource, $location) {
    
  		var StudyArea = $resource('/api/studyareas');

  		function init(){

  			StudyArea.query({"is_public":true},function(results){
  				$scope.studyareas=results;
  				console.log(results);
  			})
  		}
  		init();

  		$scope.tileClick = function(sa_id){

  			$location.path("studyarea/" + sa_id);

  		}

  });
