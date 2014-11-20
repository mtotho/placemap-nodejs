'use strict';

angular.module('placemapApp')
  .controller('StudyareaCtrl', function ($scope, GMap, $resource, $timeout, $stateParams, StudyAreaMap, $rootScope) {
	    var sa_id = $stateParams.studyarea_id;
	 	var StudyArea = $resource('/api/studyareas/'+sa_id);

	 	var selectedMarker;
	 	var draggableSet = false;
	 	var initSate = true; //initState is state before draggable is set for rating
	 	var markerZindex=0;
	 	var selectedResponse;
	 	$scope.ratingModeEnabled=false;
    	$scope.qvopen = false; //initialize marker response (question view) panel to closed
    	$scope.marker;
    	$scope.selectedMarker;

	    function init(){

	    	//make the rate select button disabled. This is disabled until rating is selected
	    	$("#btnSelectMarkerLocation").addClass("disabled");
			$("#btnConfirmLocation").addClass("disabled");
	    	



	    	StudyArea.get(function(result){
	    		$scope.studyarea=result;
	    		console.log(result);
	    		//console.log("derp");
    			StudyAreaMap.init(result);
    		
    			//StudyAreaMap.setRatingMode(false);
				$scope.setRatingMode(false);
	    		map_resize2();
    			GMap.checkResize();
	    		//initListeners();

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
    	
    	$rootScope.$on("response_click", function(){
    		
    		var selected = StudyAreaMap.getSelectedResponse();
    	

   			$scope.ratingModeEnabled=StudyAreaMap.getRatingMode();
		   //	
	  
	      	$scope.$apply(function(){
	      		$scope.selectedMarker=selected;
	      		$scope.responseShown=true;
	      	});		
	       	$(".response_panel").collapse("show");

		   		//apply dbmarker data to the scope
	   	  	//applyResponsePanel(dbmarker);

	   	  	
	   	  	if(window.debug)console.log("===Marker Clicked===");
	   	  	if(window.debug)console.log(selected);
		    if(window.debug)console.log(" ");

			      	

		//}
    	});
	    
	    $scope.setRatingMode = function(bool){
	    	$scope.ratingModeEnabled=bool;
	    	StudyAreaMap.setRatingMode(bool);

			
			if(bool){
			
				hideResponse();

			}else{
				cancelMarkerLock();
				
			}
	    	//setRatingMode(bool);
	    }
	    $scope.rdoColorChange = function(markerType){

			if(markerType!="undefined"){
			
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
			if(!StudyAreaMap.isRatingLocked() && $scope.markerType!="undefined"){
				//flag so we know this button is clicked
				
				StudyAreaMap.lockRating(true);

				//indicate button is pressed
				$("#btnSelectMarkerLocation").addClass("active");

				//Hide any response panels showing 
				$(".response_panel").collapse("hide");
				
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
		function cancelMarkerLock(){
		
			StudyAreaMap.lockRating(false);
			//setRatingMode(false);

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
	        if(!enabled && StudyAreaMap.isRatingLocked()){
	        	cancelMarkerLock();
	        }
	    });

    	function hideResponse(){
    		//Hide the response panel
			$(".response_panel").collapse("hide");
 			$scope.responseShown = false;	
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