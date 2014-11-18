'use strict';

angular.module('placemapApp')
  .controller('AdminSACreateCtrl', function ($scope, GMap, $state, $resource,userStorage) {
    	
  		var StudyArea = $resource('/api/studyareas');
  		var AuditType = $resource('/api/audit_types');
  		
  		var storage = userStorage.model.admin.studyareas.create;
  		console.log(userStorage);
  		function init(){

  			if(storage.in_progress){
  				GMap.preSetCenter(storage.lat, storage.lng);
  				GMap.preSetZoom(parseInt(storage.zoom));
  				$scope.mapzoom=storage.zoom;
  				$scope.StudyAreaName=storage.name;
  			}

  			GMap.init("map_canvas");
  			map_resize();
  			GMap.checkResize();

	    	google.maps.event.addListener(GMap.getMap(), 'idle', function() {
	    		syncStorage();
 	     	});

	    	//Map zoom change
			google.maps.event.addListener(GMap.getMap(), 'zoom_changed', function() {
			    syncStorage();
		    	applyMapZoom(GMap.getZoom());

		 	});

  			$scope.chkListPublic=false;

  			AuditType.query(function(result){
  				$scope.question_sets=result;
  			});


  		}
  		init();

  		function syncStorage(){
  			storage.in_progress=true;
  			storage.name=$scope.StudyAreaName;
  			storage.lat=""+GMap.getCenter().lat();
			storage.lng=""+GMap.getCenter().lng();
			storage.zoom=GMap.getZoom();
  		}

  		$scope.inputUpdated = function(){
  			storage.in_progress=true;
  			syncStorage();
  		}
  		$scope.zoomChange = function(){
			$scope.map.zoom=parseInt($scope.zoom);

			console.log($scope.map);
		}

		function applyMapZoom(zoom){
			$scope.$apply(function(){
					$scope.mapzoom = zoom;
			});
		
		}

		

		$scope.createStudyArea = function(form){


	      if(form.$valid) {

			var date = new Date;
			var unixtime=parseInt(date.getTime()/1000);
			var unixtime_to_date = new Date(unixtime*1000);
			
			var sa = new StudyArea();
			sa.name=$scope.StudyAreaName;
			sa.default_zoom=GMap.getZoom();
			sa.lat=""+GMap.getCenter().lat();
			sa.lng=""+GMap.getCenter().lng();
			//sa.timestamp = unixtime_to_date
			sa.is_public = $scope.chkListPublic;
			sa.default_audit_type=$scope.selQS._id;
			console.log(sa);
			sa.$save(function(result){
				storage.in_progress=false;
      			$state.transitionTo("admin.studyareas");
      		});

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