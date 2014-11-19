'use strict';

angular.module('placemapApp')
  .service('StudyAreaMap', function (GMap, $rootScope) {
  
  	this.studyarea;
  	this.responses;
  	this.selectedResponse; //id of selected response
  	this.rating_mode; //boolean, whether or not user is rating
  	this.markerZ=0;

  	var instance = this;

  	this.init = function(studyarea){
  		this.studyarea=studyarea;
  		this.markerZ=0;

  		//Load the map options from the studyarea
  		GMap.preSetCenter(studyarea.lat, studyarea.lng);
  		GMap.preSetZoom(studyarea.default_zoom);

  		//initialize the map object on the cavas
		GMap.init("map_canvas");

		
		GMap.setDraggableIcon("grey");
	//setRatingMode(false);
	    		

  		this.responses = new Object();
  		for(var i=0; i<this.studyarea.responses.length; i++){
  			this.loadResponse(this.studyarea.responses[i]);
  		}

  		//enable marker clustering
  		GMap.showClustering();

  	}

  	this.loadResponse = function(response){
  		var gMarker = GMap.loadMarker({
  			"lat":response.lat,
  			"lng":response.lng,
  			"icon":response.icon,
  			"response_id":response._id
  		});

  		response.gMarker=gMarker;
  		this.responses[response._id]=response;

		google.maps.event.addListener(gMarker, 'click', function() {
		   		
		   		if(!instance.rating_mode){

		   			if(instance.selectedResponse != null){
						instance.selectedResponse.gMarker.setIcon({"url":GMap.getIcons()[instance.selectedResponse.icon], "anchor":new google.maps.Point(12,13)});
					}

			   		var selectedResponse = instance.responses[this.response_id];
			   		instance.selectedResponse=selectedResponse;
			   		
			   		this.setZIndex(instance.markerZ);
		   			instance.markerZ++


			   		this.setIcon({"url":GMap.getIcons()[selectedResponse.icon+"-select"], "anchor":new google.maps.Point(12,13)});



			   		$rootScope.$broadcast('response_click');


		   		}
		   		//Return previously selected marker icon to default
				
		   		//
		   		//console.log(selectedResponse);
		   		/*
		   	//ONLY show response if not currently rating
		   	if(!setMarkerIsClicked){
		  
		   		this.setZIndex(markerZindex);
		   		markerZindex++

		   		$scope.btnCancelMarkerPlacement();
		   		//If another marker has already been selected, revert that marker's icon back to normal 
		   		if(!angular.isUndefined(selectedMarker)){
		   			selectedMarker.setIcon({"url":gmap.getIcons()[selectedDBMarker.icon], "anchor":new google.maps.Point(12,13)});
		   		}
		   		//Set the selected marker to be this current one we just clicked
		   		selectedMarker=this;

		   		//Grab the database marker 'placemap marker' object associated with this google map marker 
		     	var marker_id=this.marker_id;
		     	var dbmarker = placemarkers[marker_id];

		     	//set the selected DB marker for use elsewhere
		   		selectedDBMarker = dbmarker;

		   		//apply dbmarker data to the scope
		   	  	applyResponsePanel(dbmarker);

		   	  	//set the icon of the selected marker to a noticeably different one so we can distinguish
		   	  	this.setIcon({"url":gmap.getIcons()[dbmarker.icon+"-select"], "anchor":new google.maps.Point(12,13)});
		   	  	
		   	  	if(window.debug)console.log("===Marker Clicked===");
		   	  	if(window.debug)console.log(dbmarker);
			    if(window.debug)console.log(" ");

		      	$(".response_panel").collapse("show");
		      	$scope.$apply(function(){
		      		$scope.responseShown=true;
		      	});
		      	
*/
		//  	}
	    
		});//end marker click
		
  	}
  	this.setRatingMode = function(bool){
  		this.rating_mode=bool;
  	}
  	this.getSelectedResponse = function(){
  		return this.selectedResponse;
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
  });
