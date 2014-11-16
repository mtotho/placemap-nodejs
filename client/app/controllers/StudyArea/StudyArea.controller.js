'use strict';

angular.module('placemapApp')
  .controller('StudyareaCtrl', function ($scope, GMap, $resource, $stateParams) {
	    var sa_id = $stateParams.studyarea_id;
	 	var StudyArea = $resource('/api/studyareas/'+sa_id);


	    function init(){

	    	$scope.ratingModeEnabled=false;

	    	StudyArea.get(function(result){
	    		$scope.studyarea=result;

    			GMap.setStudyArea(result);
    			GMap.init("map_canvas");
	  			map_resize();
	  			
	    		console.log(result);


	    	});
	    }
	    init();

	    $scope.setRatingMode = function(bool){
	    	$scope.ratingModeEnabled=bool;
	    }

  });

function map_resize(){
	var headerheight=$("header").outerHeight();
	  var info_height=$("#info_area").outerHeight();
	  var windowheight=$(window).outerHeight();

	  var targetheight = windowheight - (headerheight + info_height);

	$("#map_canvas").height(targetheight);
}

$(window).resize(function(){
 	map_resize();
});