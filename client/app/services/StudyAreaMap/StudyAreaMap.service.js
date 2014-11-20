'use strict';

angular.module('placemapApp')
  .service('StudyAreaMap', function (GMap, $rootScope, $timeout) {
  
  	this.studyarea;
  	this.responses;
  	this.selectedResponse; //id of selected response
  	this.rating_mode; //boolean, whether or not user is rating
  	this.rating_lock;
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

		//set the default color for the draggable marker
		GMap.setDraggableIcon("grey");

		//initialize all map action listeners
		this.initListeners();
	    		
		//Load responses onto the map
  		this.responses = new Object();
  		for(var i=0; i<this.studyarea.responses.length; i++){
  			this.loadResponse(this.studyarea.responses[i]);
  		}

  		//enable marker clustering
  		GMap.showClustering();

  	}

  	//loadResponse(): load a single response onto the map and into the response array
  	this.loadResponse = function(response){
  		var gMarker = GMap.loadMarker({
  			"lat":response.lat,
  			"lng":response.lng,
  			"icon":response.icon,
  			"response_id":response._id
  		});

  		response.gMarker=gMarker;
  		this.responses[response._id]=response;

  		//Marker Click event
		google.maps.event.addListener(gMarker, 'click', function() {
		   		
		   		//If we were rating, disable rating mode
		   		if(instance.rating_mode){
		   			instance.setRatingMode(false);
		   		}

		   		//If not already locked onto a location, allow selecting of other markers
		   		if(!instance.rating_lock){

		   			//Deselect any existing response
		   			if(instance.selectedResponse != null){
						instance.deselectResponse(instance.selectedResponse._id);
					}

					//Select the marker we just clicked
					instance.selectResponse(this.response_id);

					//Broadcast click action back to controller
			   		$rootScope.$broadcast('response_click');
		   		}
	    
		});//end marker click
		
  	}
  	//toggle rating mode. enables draggable marker and tooltip
  	this.setRatingMode = function(bool){
  		this.rating_mode=bool;
  		if(bool){
  			GMap.enableDraggable(true);
  			this.showToolTip();
			if(this.selectedResponse != null){
				this.deselectResponse(this.selectedResponse._id);
			}
  		}else{
  			GMap.enableDraggable(false);
  		}

  	}
  	this.deselectResponse = function(id){
  		var deselectedResponse = this.responses[id];
  		deselectedResponse.gMarker.setIcon({"url":GMap.getIcons()[deselectedResponse.icon], "anchor":new google.maps.Point(12,13)});
  	}

  	//set the selected response and update the marker icon
  	this.selectResponse = function(id){
  		this.selectedResponse=this.responses[id];
   		
   		this.selectedResponse.gMarker.setZIndex(this.markerZ);
		this.markerZ++

			//Change icon to make it clear which is selected
   		this.selectedResponse.gMarker.setIcon({"url":GMap.getIcons()[this.selectedResponse.icon+"-select"], "anchor":new google.maps.Point(12,13)});
  	}
  	this.getRatingMode = function(){
  		return this.rating_mode;
  	}
  	this.lockRating = function(bool){
  		this.rating_lock = bool;
		//if(bool){
		
			///hideResponse();

		GMap.lockDraggableMarker(bool);
		if(!bool)GMap.setDraggableIcon("grey");
			//showToolTip();
  	}
  	this.isRatingLocked = function(){
  		return this.rating_lock;
  	}
  	this.getSelectedResponse = function(){
  		return this.selectedResponse;
  	}

  	this.initListeners = function(){
		google.maps.event.addListener(GMap.getDraggableMarker(), 'mouseover', function() {
     		GMap.getDraggableMarker().setAnimation(null);
 		});

     	//Start draggable marker bounce upon mouseout
     	google.maps.event.addListener(GMap.getDraggableMarker(), 'mouseout', function() {
	     	if(!this.rating_mode){ //We do not want to animate marker if the user has locked in a location to rate
	 			GMap.getDraggableMarker().setAnimation(google.maps.Animation.BOUNCE);
		 	}
		 });

		google.maps.event.addListener(GMap.getDraggableMarker(), 'drag', function(){
	
			instance.positionTooltip();
		});
     	google.maps.event.addListener(GMap.getMap(), 'dblclick', function(event) {
     		GMap.getDraggableMarker().setPosition(event.latLng);
     		GMap.getDraggableMarker().setAnimation(google.maps.Animation.BOUNCE);
     	});
     	google.maps.event.addListener(GMap.getMap(), 'dragstart', function() {
     	
     	});
		google.maps.event.addListener(GMap.getMap(), 'drag', function(){
			instance.positionTooltip();
		});
     	google.maps.event.addListener(GMap.getMap(), 'idle', function() {
			instance.positionTooltip();
     	});

	     	//Map click event
		google.maps.event.addListener(GMap.getMap(), 'click', function(event) {
		   	//Hide the response panel
		   //$scope.$apply(function(){
     			//hideResponse();
     		//});
 		});

	}

	this.showToolTip = function(){
		if(this.rating_mode){
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
	this.positionTooltip = function(){
		//console.log(pos);
		var pos = GMap.getXY(GMap.getDraggableMarker().getPosition());
		
		$(".tooltip").css("top",pos.y-40);
		$(".tooltip").css("left",pos.x+15);
		
		
		if(pos.x<0 || pos.y< 40 || pos.x>(window.innerWidth-$('.tooltip').width()-45) || pos.y>window.innerHeight){
			$("#draggableTooltip").tooltip("hide");
		}
	}//end: positionTooltip()
  });
