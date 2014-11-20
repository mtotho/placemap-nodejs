'use strict';

angular.module('placemapApp')
  .controller('StudyareadataCtrl', function ($scope, $resource, $stateParams) {
	var sa_id = $stateParams.studyarea_id;
	var StudyArea = $resource('/api/studyareas/'+sa_id);
    

	function init(){
	 	StudyArea.get(function(result){
    		$scope.studyarea=result;
    		console.log("====Study Area Data====");
    		console.log(result);
    	
    		//initListeners();

    	});
	}
	init();


  });
