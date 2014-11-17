'use strict';

angular.module('placemapApp')
  .controller('StudyareaCtrl', function ($scope, GMap, $resource, $timeout, $stateParams) {
	    var sa_id = $stateParams.studyarea_id;
	 	var StudyArea = $resource('/api/studyareas/'+sa_id);

	 	var selectedMarker;
	 	var draggableSet = false;
	 	var initSate = true; //initState is state before draggable is set for rating

	 	$scope.ratingModeEnabled=false;
    	$scope.qvopen = false; //initialize marker response (question view) panel to closed
    	$scope.marker;

	    function init(){

	    	//make the rate select button disabled. This is disabled until rating is selected
	    	$("#btnSelectMarkerLocation").addClass("disabled");
			$("#btnConfirmLocation").addClass("disabled");
	    	



	    	StudyArea.get(function(result){
	    		$scope.studyarea=result;

    			GMap.setStudyArea(result);
    			GMap.init("map_canvas");
	  			map_resize2();
	  			
	  			GMap.checkResize();

				GMap.setDraggableIcon("grey");
				setRatingMode(false);
	    		console.log(result);

	    		initListeners();

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

	    $scope.setRatingMode = function(bool){
	    	$scope.ratingModeEnabled=bool;
	    	setRatingMode(bool);
	    }
	    $scope.rdoColorChange = function(markerType){

			if(markerType!="undefined"){
				hideResponse();
				//setRatingMode(true);
				//set the draggable icon color
				//var pos = gmap.getDraggableMarker().getPosition();
				GMap.setDraggableIcon("light-"+$scope.markerType);

				//Replace the draggable marker on the map (it seems to disapear from the map when you change icon)
				GMap.getDraggableMarker().setMap(GMap.getMap());


				//set the animation to bounce to the user can see where it is placed.
				GMap.getDraggableMarker().setAnimation(google.maps.Animation.BOUNCE);
			//	gmap.getDraggableMarker().setPosition(pos);



				$("#btnSelectMarkerLocation").removeClass("disabled");
			}
		}
		//Confirm rating/Temporation location
		$scope.btnSetRating = function(){

			//Don't allow button click if it's already clicked or no maarker rating is defined
			if(!draggableSet && $scope.markerType!="undefined"){
				//flag so we know this button is clicked
				draggableSet = true;

				//indicate button is pressed
				$("#btnSelectMarkerLocation").addClass("active");

				//Hide any response panels showing 
				$(".response_panel").collapse("hide");
				
				//lock the draggable marker into place (and stop the bouncing)
				GMap.lockDraggableMarker(true);

				//define marker so we can post it to db should user go through with questions
				var pos =  GMap.getDraggableMarker().getPosition();
				$scope.marker={
					"lat":pos.lat(),
					"lng":pos.lng(),
					"study_area_id":sa_id,
					//"participant_id":$scope.participant.id,
					"icon":$scope.markerType
				}

				//flag qvopen to true to show the questions view
				$scope.qvopen=true;
			}

		}

		//Cancel the the marker rating and location lock
		$scope.btnCancelMarkerPlacement = function(){
			//reflag the button as not clicked
			draggableSet=false;

			setRatingMode(false);

		  	$scope.markerType=null;
			
			//remove indication button is clicked
			$("#btnSelectMarkerLocation").removeClass("active");
			
			//redisable  button 
			$("#btnSelectMarkerLocation").addClass("disabled");

			//redisable confirm button
			$("#btnConfirmLocation").addClass("disabled");

			//undo location type selection
			$scope.locationType=null;

			//hide collapsible content
			//$(".collapse").collapse('hide');
		}

		//watch 'qvopen' change to decide whether to cancemarker placement
		$scope.$watch('qvopen', function(enabled){
			
			//Cancel marker placement if question view is hidden
	        if(!enabled && draggableSet){
	        	$scope.btnCancelMarkerPlacement();
	        }
	    });
	    function setRatingMode(bool){
	    	if(bool){
			
				hideResponse();
				GMap.enableDraggable(true);

				showToolTip();

				$("#rating_panel").removeClass("opaque");
				GMap.setDraggableIcon("grey");

			}else{

				GMap.enableDraggable(false);
				$("#rating_panel").addClass("opaque");
			}
	    }

    	function hideResponse(){
			$(".response_panel").collapse("hide");
				//If there is a marker selected (for viewing responses) unselect that marker (change the icon back to default)
	     	if(!angular.isUndefined(selectedMarker)){
	   			selectedMarker.setIcon({"url":GMap.getIcons()[selectedDBMarker.icon], "anchor":new google.maps.Point(12,13)});
	   		}
	      	
 			$scope.responseShown = false;
 		
		}

		function showToolTip(){
			if($scope.ratingModeEnabled){
				var pos = GMap.getXY(GMap.getDraggableMarker().getPosition());
				$("#draggableTooltip").css("top", pos.y-40);
				$("#draggableTooltip").css("left", pos.x+15);
				$("#draggableTooltip").tooltip('show');
				
				var tooltipWidth = $('.tooltip').width();
				$timeout(function(){
					$("#draggableTooltip").tooltip('hide');
				}, 4000)

			}
		}//end: showToolTip();
		function positionTooltip(){
			//console.log(pos);
			var pos = GMap.getXY(GMap.getDraggableMarker().getPosition());
			
			$(".tooltip").css("top",pos.y-40);
			$(".tooltip").css("left",pos.x+15);
			
			
			if(pos.x<0 || pos.y< 40 || pos.x>(window.innerWidth-$('.tooltip').width()-45) || pos.y>window.innerHeight){
				$("#draggableTooltip").tooltip("hide");
			}
		}//end: positionTooltip()
		function initListeners(){
			google.maps.event.addListener(GMap.getDraggableMarker(), 'mouseover', function() {
	     		GMap.getDraggableMarker().setAnimation(null);
	 		});

	     	//Start draggable marker bounce upon mouseout
 	     	google.maps.event.addListener(GMap.getDraggableMarker(), 'mouseout', function() {
		     	if(!draggableSet){ //We do not want to animate marker if the user has locked in a location to rate
	     			GMap.getDraggableMarker().setAnimation(google.maps.Animation.BOUNCE);
			 	}
			 });

			google.maps.event.addListener(GMap.getDraggableMarker(), 'drag', function(){
		
				positionTooltip();
			});
 	     	google.maps.event.addListener(GMap.getMap(), 'dblclick', function(event) {
 	     		GMap.getDraggableMarker().setPosition(event.latLng);
		     	GMap.getDraggableMarker().setAnimation(google.maps.Animation.BOUNCE);
 	     	});
 	     	google.maps.event.addListener(GMap.getMap(), 'dragstart', function() {
 	     	
 	     	});
			google.maps.event.addListener(GMap.getMap(), 'drag', function(){
				positionTooltip();
			});
 	     	google.maps.event.addListener(GMap.getMap(), 'idle', function() {
				positionTooltip();
 	     	});

 	     	//Map click event
			google.maps.event.addListener(GMap.getMap(), 'click', function(event) {
			   	//Hide the response panel
			   	$scope.$apply(function(){
	     			hideResponse();
	     		});
	 		});

		}
  });

function map_resize2(){
	var headerheight=$("header").outerHeight();
	  var info_height=$("#info_area").outerHeight();
	  var windowheight=$(window).outerHeight();

	  var targetheight = windowheight - (headerheight + info_height);

	$("#map_canvas").height(targetheight);
}

$(window).resize(function(){
 	map_resize2();
});