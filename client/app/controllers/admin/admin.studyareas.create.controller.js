'use strict';

angular.module('placemapApp')
  .controller('AdminSACreateCtrl', function ($scope, GMap, $resource) {
    
  		function init(){
  			GMap.init("map_canvas");
  			map_resize();
  			GMap.checkResize();
  		}
  		init();

  		$scope.zoomChange = function(){
			$scope.map.zoom=parseInt($scope.zoom);

			console.log($scope.map);
		}

		function applyMapZoom(zoom){
			$scope.$apply(function(){
					$scope.mapzoom = zoom;
			});
		
		}

		//Map zoom change
		google.maps.event.addListener(GMap.getMap(), 'zoom_changed', function() {
	    	applyMapZoom(GMap.getZoom());

	 	});

		$scope.btnCreateStudyArea = function(){

			var study_area={
				name:$scope.StudyAreaName,
				zoom:GMap.getZoom(),
				lat:GMap.getCenter().lat(),
				lng:GMap.getCenter().lng()
			}


		}


  		

  });
function map_resize(){
	var headerheight=$("header").outerHeight();
  	var windowheight=$(window).outerHeight();
  	var view_content_margin=$(".view_content").outerHeight(true) - $(".view_content").outerHeight();

  	var targetheight = windowheight - (headerheight + view_content_margin);

	$("#map_canvas").height(targetheight);
}

$(window).resize(function(){
 	map_resize();
});