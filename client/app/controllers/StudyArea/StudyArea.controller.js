'use strict';

angular.module('placemapApp')
  .controller('StudyareaCtrl', function ($scope, GMap, API, $timeout,$rootScope, $stateParams, ngProgress, uiGmapGoogleMapApi, uiGmapIsReady) {
	    var sa_id = $stateParams.studyarea_id;

	    var markerZindex=1;
	 	$scope.ratingModeEnabled=false;
    	$scope.qvopen = false; //initialize marker response (question view) panel to closed
    
    	$scope.selectedMarker;
    	$scope.map = new Object();
    	$scope.mapControl = {};
    	$scope.markerControl = {};
    	
    	$scope.mapLoaded = false;
    	
	    function init(){
	    	ngProgress.color('green');
    		ngProgress.start();

	    	//make the rate select button disabled. This is disabled until rating is selected
	    	$("#btnSelectMarkerLocation").addClass("disabled");
		
	    	
	    	API.Studyarea.get({id:sa_id},function(result){
	    		$scope.studyarea=result;
	    		setUpMap(result);
	    	
	    	});


	    	//Initialize Bootstrap objects
			$('.collapse').collapse({
			  toggle: false
			});
			
			$('#mdlAddMarker').modal({
			  show: false
			});	

			$("#draggableTooltip").tooltip({
				"trigger":"manual",
				"placement":"right",


			});
	    }
	    init();
		
		//set up markers, map center, events, etc
		function setUpMap(result){
			console.log(result);
			
    		//Ensure google SDK loaded before using it
    		uiGmapGoogleMapApi.then(function(maps) {
    		
	    		$scope.studyarea.responseMarkers = [];
				//Loop over the responses and create map marker models
	    		for(var i=0; i<result.responses.length; i++){
	    			var res = result.responses[i];
	    			var m ={
		    				latitude: res.lat,
		    				longitude: res.lng,
		    				id:res._id,
		    				title:'derp',
		    				icon:GMap.icons[res.icon],
		    				iconColor:res.icon,
		    				responses:res.responses,
		  
	    				}

	    			$scope.studyarea.responseMarkers.push(m);
	    		}

				//Define the map object
			 	$scope.map = { 
	    			center: 
	    				{ 
	    					latitude:  result.lat, 
	    					longitude: result.lng 
	    				}, 
					zoom: result.default_zoom,
					control:{},
					markersControl:{}

				};

	    		//define the draggable marker
	    		$scope.draggable={
	    			sa_id:result._id,
	    			coords:{
	    				latitude:result.lat,
	    				longitude:result.lng
	    			},
	    			options:{
	    				icon:GMap.icons.grey,
	    				draggable:true,
	    				visible:false,
	    				animation:maps.Animation.BOUNCE
	    			},
	    			events:{
	    				//stop the animation when moused over
	    				mouseover:function(marker,eventName,args){
	    					if(!this.isClicked)
	    						this.options.animation=null;
	    				},
	    				mousedown:function(marker,eventName,args){
	    					this.isClicked = true;
	    				},
	    				mouseup:function(){
	    					this.isClicked = false;
	    				},
	    				//restart bouncing when moused out
    					mouseout:function(marker,eventName,args){
	    					if(!this.isClicked)
	    						this.options.animation=maps.Animation.BOUNCE;
	    				}
	    			},
	    			
	    			id:"draggable"
	    			
	    		}


    			//Define all the map events
		    	$scope.map_events={
		    		responseMarker:{
		    			click:function(marker){
		    				    $scope.$apply(function () {
		    				    	console.log(marker);
				                    $scope.selectedMarker=marker;
	                 		 	});
		    			}//end click
		    		},//end responseMarker events

		    		map:{
		    			idle:function(map){
		    	

		    			}
		    		}//end map events
		    	}//end all events

		    	$scope.mapLoaded=true;
		    	ngProgress.complete(); 
		    });

			//Wait till make is loaded
    		uiGmapIsReady.promise(1).then(function(instances) {
		     	//console.log(instances);
		        instances.forEach(function(inst) {
		            var map = inst.map;
		          	GMap.showClustering(map, $scope.map.markersControl.getGMarkers());
		            //console.log(map);
		        });
		    });

		}    	

		//Size map height after it loads
		$scope.$on('$viewContentLoaded', function () {
			map_resize2();
	    });



    
    	//the rating mode 
	    $scope.setRatingMode = function(bool){
	    	$scope.ratingModeEnabled=bool;
	    	//StudyAreaMap.setRatingMode(bool);

	    	//hide any open responses and set the draggable marker
			if(bool && $scope.mapLoaded){

				$scope.draggable.options.icon=GMap.icons["grey"];

				//set the coords of the draggable to the center of the map
				$scope.draggable.coords = angular.copy($scope.map.center);
				$scope.draggable.options.visible=true;
					
				//Hide any open responses
				$scope.selectedMarker=null;

			//hide draggable marker, cancel rating select
			}else if(!bool && $scope.mapLoaded){
				$scope.markerType=null;
				$scope.draggable.options.visible=false;
			}
	    	//setRatingMode(bool);
	    }

	    //Watch $scope.selectedMarker
	    $scope.$watch('selectedMarker', function(marker, oldmarker){
	    	
	    	//revert old marker icon back to default
	    	if(!angular.isUndefinedOrNull(oldmarker)){
	    		oldmarker.model.icon=GMap.icons[oldmarker.model.iconColor];
	    	}

	    	//If a new marker is selected
	    	if(!angular.isUndefinedOrNull(marker)){
	    		markerZindex++;

	    		//disable the rating mode so the response can be viewed
	    		$scope.setRatingMode(false);

	    		//Change the marker icon to its selected state
	    		marker.model.icon=GMap.icons[marker.model.iconColor + '-select'];
	    		marker.setZIndex(markerZindex);

	    		//show the response panels
	    		$scope.responseShown=true;
	    		$(".response_panel").collapse("show");



	    	//New marker is null, hide response
	    	}else{
	    		$(".response_panel").collapse("hide");
 				$scope.responseShown = false;	
	    	}

	    });//end watch selectedMarker


	    //Watch markerType change so we can update draggable and buttons
	    $scope.$watch('markerType',function(markerType){
	    	
	    	//Ensure markerType is defined
	    	if(!angular.isUndefinedOrNull(markerType)){

	    		//set the draggable icon to reflect markerType
				$scope.draggable.options.icon=GMap.icons["light-"+$scope.markerType];
				$scope.draggable.icon=markerType;
				$("#btnSelectMarkerLocation").removeClass("disabled");
			}else{
				$("#btnSelectMarkerLocation").removeClass("active");
				$("#btnSelectMarkerLocation").addClass("disabled");
			}

	    });
	   	

		//Confirm rating/Temporation location
		$scope.btnSetRating = function(){
			
			//StudyAreaMap.lockRating(true);
			$scope.draggable.options.animation=null;
			//indicate button is pressed
			$("#btnSelectMarkerLocation").addClass("active");

			//Hide any response panels showing 
			$(".response_panel").collapse("hide");
		
			//flag qvopen to true to show the questions view
			$scope.qvopen=true;
		

		}

		//watch 'qvopen' change to decide whether to cancemarker placement
		$scope.$watch('qvopen', function(enabled){
			
			//Cancel marker placement if question view is hidden
	        if(!enabled && $scope.ratingModeEnabled){
	        	//cancelMarkerLock();
	        	$scope.setRatingMode(false);
	        }
	    });

    	


  });

function map_resize2(){
	var headerheight=$("header").outerHeight();
	  var info_height=$("#info_area").outerHeight();
	  var windowheight=$(window).outerHeight();

	  var targetheight = windowheight - (headerheight + info_height);
	  console.log(targetheight);
	$("#map_canvas .angular-google-map-container").css('height',targetheight+'px');
}

$(window).resize(function(){
 	map_resize2();
});