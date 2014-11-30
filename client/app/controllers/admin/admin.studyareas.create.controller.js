'use strict';

angular.module('placemapApp')
  .controller('AdminSACreateCtrl', function ($scope, $state, API,userStorage,uiGmapGoogleMapApi) {
    	
  		//ar StudyArea = $resource('api/studyareas');
  		//var AuditType = $resource('api/audit_types');
  		
  		var storage = userStorage.model.admin.studyareas.create;
 
  		function init(){

  			//Ensure google SDK loaded before using it
    		uiGmapGoogleMapApi.then(function(maps) {
    				//Define the map object
			 	$scope.map = { 
	    			center: 
	    				{ 
	    					latitude:  44.337689, 
	    					longitude: -72.7561370999999 
	    				}, 
					zoom: 10,
					control:{},
					markersControl:{},
					events:{
						idle:function(map){
							syncStorage();
						},
						zoom_changed:function(map){
							syncStorage();
						}
					}

				};



	  			if(storage.in_progress){
	  				$scope.map.center={
	  					latitude: storage.lat,
	  					longitude:storage.lng
	  				}
	  				$scope.map.zoom=storage.zoom;

	  				//$scope.mapzoom=storage.zoom;
	  				$scope.StudyAreaName=storage.name;
	  				$scope.chkListPublic=storage.is_public;
	  			}

    		});




  			API.AuditType.query(function(result){
  				$scope.question_sets=result;
  			});
  		

  		}
  		init();

		//Size map height after it loads
		$scope.$on('$viewContentLoaded', function () {
			map_resize();
	    });
  		function syncStorage(){
  			storage.in_progress=true;
  			storage.name=$scope.StudyAreaName;
  			storage.lat=""+$scope.map.center.latitude;
			storage.lng=""+$scope.map.center.longitude;
			storage.zoom=$scope.map.zoom;
			storage.is_public=$scope.chkListPublic;

  		}

  		$scope.inputUpdated = function(){

  			syncStorage();
  		}
  		$scope.zoomChange = function(){
			$scope.map.zoom=parseInt($scope.zoom);

			
		}

		function applyMapZoom(zoom){
			$scope.$apply(function(){
					$scope.map.zoom = zoom;
			});
		
		}

		

		$scope.createStudyArea = function(form){


	      if(form.$valid) {

			var date = new Date;
			var unixtime=parseInt(date.getTime()/1000);
			var unixtime_to_date = new Date(unixtime*1000);
			
			var sa = new API.Studyarea();
			sa.name=$scope.StudyAreaName;
			sa.default_zoom=$scope.map.zoom;
			sa.lat=""+$scope.map.center.latitude;
			sa.lng=""+$scope.map.center.longitude;
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
  //console.log(targetheight);
	$("#map_canvas .angular-google-map-container").height(targetheight);
}

$(window).resize(function(){
 	map_resize();
});